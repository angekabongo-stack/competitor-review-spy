-- Run this in your Supabase SQL Editor
-- (Dashboard → SQL Editor → New query)

CREATE TABLE IF NOT EXISTS public.facebook_leads (
  id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email          text NOT NULL UNIQUE,
  name           text,
  source         text DEFAULT 'facebook_ad',
  sequence_step  integer DEFAULT 0,
  last_sent_day  integer,
  last_sent_at   timestamptz,
  next_send_at   timestamptz,
  unsubscribed   boolean DEFAULT false,
  finished       boolean DEFAULT false,
  created_at     timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS facebook_leads_next_send_idx
  ON public.facebook_leads (next_send_at)
  WHERE unsubscribed = false AND finished = false;

ALTER TABLE public.facebook_leads ENABLE ROW LEVEL SECURITY;
