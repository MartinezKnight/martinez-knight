# Prospect email notifications — activation checklist

The website already stores discovery submissions in `public.prospects`. This email handler is designed to run from a Supabase Database Webhook after each new row is inserted. It sends:
- An internal notification to the Martinez Knight admin inbox, with the lead details and a link to the private pipeline.
- An acknowledgement email to the prospect, confirming receipt and explaining that the team will review their requirements and follow up.

## Important: what is and is not live yet

The source code is included in this repository, but email delivery will not begin until the Edge Function is deployed, the email provider is configured, and the database webhook is created. No email provider account or sending-domain credentials were available to configure from this repository.

## 1. Email sender requirement

This implementation uses Resend. Resend's test sender `onboarding@resend.dev` is restricted to test messages sent to the email address associated with your Resend account. To send acknowledgements to real prospects, you need a domain verified in Resend and an address on that domain for `EMAIL_FROM`.

You do not need to purchase web hosting or move the website. A domain can be used only for email authentication while the website remains on GitHub Pages. If you are not ready to register/use a domain, leave email sending inactive for now; the form and prospect database continue to work.

## 2. Deploy the Edge Function

From the repository root, after installing the Supabase CLI and signing in:

```bash
supabase login
supabase link --project-ref fpzpjhlwnaatvvcwzntr
supabase functions deploy prospect-email
```

The function configuration in `supabase/config.toml` disables JWT verification because the database webhook authenticates with its own shared secret header. The function checks that header before processing any event.

## 3. Add function secrets

In Supabase Dashboard → Project → Edge Functions → Secrets, add:

| Name | Value |
|---|---|
| `RESEND_API_KEY` | API key created in your Resend account |
| `EMAIL_FROM` | A sender address on your Resend-verified domain, e.g. `Martinez Knight <notifications@your-verified-domain>` |
| `ADMIN_NOTIFICATION_EMAIL` | `martinezknighthrmc@gmail.com` (the existing business inbox; change if you prefer another inbox) |
| `WEBHOOK_SECRET` | A long, random secret string that you create; use the exact same value in the webhook header |

Keep the Resend API key and webhook secret in Supabase Function Secrets only. Never place them in website code or GitHub frontend variables.

## 4. Create the database webhook

In Supabase Dashboard → Database → Webhooks → Create a new webhook:

1. Name: `prospect-email-notifications`.
2. Table: `public.prospects`.
3. Events: select **Insert** only.
4. Type: **Supabase Edge Functions**.
5. Function: `prospect-email`.
6. Method: `POST`.
7. Add header `x-webhook-secret` with the exact `WEBHOOK_SECRET` value from Step 3.
8. Save the webhook.

The handler ignores non-INSERT events and validates the webhook secret before sending email.

## 5. Test the full workflow

Submit one clearly labelled test record through the public discovery form using an email inbox you can access. Confirm:
- The row appears in Supabase Table Editor → `prospects`.
- The internal inbox receives the new-prospect alert.
- The test prospect inbox receives the acknowledgement.
- The private pipeline shows the same record after administrator sign-in.

If Resend reports an unverified sender, verify the sending domain and use an address on that domain in `EMAIL_FROM`. If the database row exists but email fails, the lead is still safely stored; check Supabase Edge Function logs and Resend logs.

## Public and private routes

- Public form: https://martinezknight.github.io/martinez-knight/business-discovery
- Private admin sign-in: https://martinezknight.github.io/martinez-knight/internal/prospects

The footer's **Admin Sign In** link only opens the sign-in route. It does not expose prospect records; the dashboard continues to require an authorised Supabase Auth account and the existing Row Level Security policies.
