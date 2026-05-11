import type { Metadata } from 'next';
import { Bebas_Neue, DM_Sans } from 'next/font/google';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://competitor-review-spy.com'),
  title: 'Competitor Review Spy — See How Your Google Reviews Compare',
  description:
    'See exactly how your Google reviews stack up against competitors. Ratings, response rate, review volume. $9 one-time.',
  alternates: {
    canonical: 'https://competitor-review-spy.com',
  },
  openGraph: {
    title: 'Competitor Review Spy — See How Your Google Reviews Compare',
    description:
      'See exactly how your Google reviews stack up against competitors. Ratings, response rate, review volume. $9 one-time.',
    type: 'website',
    url: 'https://competitor-review-spy.com',
    siteName: 'Competitor Review Spy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Competitor Review Spy',
    description:
      'See exactly how your Google reviews stack up against competitors. $9 one-time.',
    site: '@competitorreviewspy',
  },
};

const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Competitor Review Spy',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'Compare your Google reviews against up to 3 competitors — ratings, response rate, review volume, and 5-star rate.',
  offers: {
    '@type': 'Offer',
    price: '9.00',
    priceCurrency: 'USD',
  },
  url: 'https://competitorreviewspy.com',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="bg-bg font-body text-cream antialiased">
        {children}
      </body>
    </html>
  );
}
