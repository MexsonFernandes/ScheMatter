# Supabase Database Webhook Setup for Contact Form Emails

## Overview
This guide explains how to set up a Database Webhook in Supabase to automatically send emails when a new contact form submission is created.

## Steps to Configure the Webhook

### 1. Deploy the Edge Function
If you haven't already, deploy the function:
```bash
npx supabase functions deploy send-contact-email --no-verify-jwt
```

### 2. Set Environment Secrets
Configure your SMTP credentials:
```bash
npx supabase secrets set \
  SMTP_HOST=your.smtp.host \
  SMTP_PORT=587 \
  SMTP_USER=your_email@example.com \
  SMTP_PASS=your_password \
  SMTP_FROM_EMAIL=noreply@schematter.com \
  ADMIN_EMAIL=admin@schematter.com
```

### 3. Create the Database Webhook

#### Option A: Via Supabase Dashboard
1. Go to your Supabase Dashboard
2. Navigate to **Database** → **Webhooks**
3. Click **Create a new webhook**
4. Configure:
   - **Name**: `contact-form-notification`
   - **Table**: `landing_contact_submissions`
   - **Events**: Check `INSERT`
   - **Type**: `HTTP Request`
   - **Method**: `POST`
   - **URL**: `https://xwrvleopahxiidroomgl.supabase.co/functions/v1/send-contact-email`
   - **HTTP Headers**: (Optional, can leave empty for Edge Functions)
5. Click **Create webhook**

#### Option B: Via SQL
Run this in your Supabase SQL Editor:
```sql
-- Create a webhook that triggers on INSERT to landing_contact_submissions
-- This will call your Edge Function automatically
CREATE OR REPLACE FUNCTION notify_contact_submission()
RETURNS TRIGGER AS $$
DECLARE
  request_id bigint;
BEGIN
  -- Make HTTP request to Edge Function
  SELECT
    net.http_post(
      url := 'https://xwrvleopahxiidroomgl.supabase.co/functions/v1/send-contact-email',
      headers := '{"Content-Type": "application/json"}'::jsonb,
      body := jsonb_build_object('record', row_to_json(NEW))
    ) INTO request_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS on_contact_submission_created ON public.landing_contact_submissions;
CREATE TRIGGER on_contact_submission_created
  AFTER INSERT ON public.landing_contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION notify_contact_submission();
```

**Note**: The SQL approach requires the `pg_net` extension. If you get an error, use the Dashboard method instead.

### 4. Test the Webhook
Submit a test contact form on your website. Check:
- The Supabase Dashboard → Database → Webhooks → Logs
- Your admin email inbox
- The Edge Function logs in Supabase Dashboard → Edge Functions

## Troubleshooting

### Email not sending?
1. Check Edge Function logs in Supabase Dashboard
2. Verify SMTP credentials are correct
3. Check webhook logs for errors
4. Ensure the webhook URL is correct

### Webhook not triggering?
1. Verify the webhook is enabled in Dashboard
2. Check that the table name is `landing_contact_submissions`
3. Ensure INSERT events are selected
4. Test by manually inserting a row via SQL

## Architecture
```
User submits form 
  → Frontend inserts to landing_contact_submissions
    → Database Webhook triggers
      → Calls send-contact-email Edge Function
        → Sends email via SMTP
          → Admin receives notification
```

This approach is cleaner than frontend invocation because:
- ✅ Guaranteed delivery (even if user closes browser)
- ✅ No client-side delays
- ✅ Centralized error handling
- ✅ Works even if form is submitted via API
