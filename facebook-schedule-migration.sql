-- Run this in your Supabase SQL Editor
-- (Dashboard → SQL Editor → New query)

-- 1. Add last_scheduled_index to facebook_leads (tracks rotation position)
ALTER TABLE public.facebook_leads
  ADD COLUMN IF NOT EXISTS last_scheduled_index integer DEFAULT -1;

-- 2. Weekly email queue — Sunday cron populates, daily cron sends
CREATE TABLE IF NOT EXISTS public.facebook_scheduled_emails (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id    uuid NOT NULL REFERENCES public.facebook_leads(id) ON DELETE CASCADE,
  email_index integer NOT NULL,   -- index into FACEBOOK_POOL (0-8, wraps)
  send_at    timestamptz NOT NULL,
  status     text NOT NULL DEFAULT 'pending', -- pending | sent | failed
  sent_at    timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Index for the daily cron query
CREATE INDEX IF NOT EXISTS fse_pending_send_at_idx
  ON public.facebook_scheduled_emails (send_at)
  WHERE status = 'pending';
