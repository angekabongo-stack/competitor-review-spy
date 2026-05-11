import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import type { CheckoutPayload } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CheckoutPayload;
    const { business_url, competitor_urls, industry, email } = body;

    if (!business_url || !email || !competitor_urls?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Store pending record in Supabase
    const { data: record, error: dbError } = await supabase
      .from('analyses')
      .insert({
        email,
        industry,
        business_url,
        competitor_urls,
        status: 'pending_payment',
      })
      .select('id')
      .single();

    if (dbError || !record) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Derive baseUrl from the incoming request so it works on any domain (local, preview, prod)
    const host = req.headers.get('host') ?? 'localhost:3000';
    const proto = req.headers.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? `${proto}://${host}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Competitor Review Spy Report',
              description:
                'Full Google review analysis vs. up to 3 competitors — ratings, response rate, volume & more.',
            },
            unit_amount: 900,
          },
          quantity: 1,
        },
      ],
      metadata: { analysis_id: record.id },
      customer_email: email,
      success_url: `${baseUrl}/results?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/analyze`,
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (err) {
    console.error('create-checkout error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
