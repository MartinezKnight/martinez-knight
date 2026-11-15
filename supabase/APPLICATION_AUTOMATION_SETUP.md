# Application form automation setup

The public Career and Training Application forms now write to separate, RLS-protected tables. They do not enter the sales prospect pipeline.

## 1. Run the database migration

In Supabase Dashboard → SQL Editor, run the complete contents of `application_forms.sql` from this folder.

## 2. Deploy the notification function

Deploy the Edge Function in `functions/application-email/index.ts` with function name `application-email`.

It reuses the existing Supabase Edge Function secrets:
- `WEBHOOK_SECRET`
- `GOOGLE_APPS_SCRIPT_URL`
- `GOOGLE_APPS_SCRIPT_SECRET`
- `ADMIN_NOTIFICATION_EMAIL`

Do not expose any of these values in the website.

## 3. Add two Database Webhooks

In Supabase Dashboard → Database → Webhooks, create one webhook for each table below:
- Table: `candidate_applications`; event: INSERT; type: Supabase Edge Function; function: `application-email`.
- Table: `training_applications`; event: INSERT; type: Supabase Edge Function; function: `application-email`.

For both, send the header `x-webhook-secret` with the same value as the existing `WEBHOOK_SECRET`, and `Content-Type: application/json`.

The existing `prospects` webhook must remain connected to `prospect-email`; do not replace it.

## 4. Admin access

The new tables allow public INSERT only when consent is true. Only authenticated users listed in `public.admin_users` can SELECT application records. No public SELECT, UPDATE or DELETE policy is created.

## 5. Test

Submit one test Career registration and one Training application. Confirm each record appears in its corresponding table and that the admin notification and applicant acknowledgement arrive. Check spam folders during the initial test.
