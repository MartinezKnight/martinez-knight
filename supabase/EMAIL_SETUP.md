# Activate prospect email notifications with your existing Gmail account

The public form already saves each submission to the Supabase `prospects` table. This email workflow uses the Gmail account you already control, through Google Apps Script, so **you do not need a custom domain, business webmail, or a Resend account**.

When activated, each new form submission triggers:
- An internal alert to your admin inbox, including the prospect's details and a link to the private pipeline.
- An acknowledgement email to the prospect, confirming receipt and explaining that Martinez Knight will review their requirements and follow up.

## What is included in this repository

- `supabase/functions/prospect-email/index.ts`: secure Supabase webhook handler.
- `supabase/google-apps-script/Code.gs`: Gmail sender that runs under your Google account.
- `supabase/config.toml`: Edge Function configuration.

Email sending is **not active yet**. The Google Apps Script must be deployed, the function deployed, secrets added, and the database webhook created. The website form and database continue to work while this is being configured.

## Step 1 — Create the Google mailer

1. Sign in to the Google account you want Martinez Knight emails to come from. The existing inbox noted for this setup is `martinezknighthrmc@gmail.com`; use it if you still have access, or use another Gmail account you control.
2. Open [Google Apps Script](https://script.google.com/) and create a **New project**.
3. Delete the starter code and paste the complete contents of `supabase/google-apps-script/Code.gs` from this repository.
4. Replace `REPLACE_WITH_A_LONG_RANDOM_SECRET` in the code with a long random value. Keep it private; you will enter the exact same value in Supabase in Step 3.
5. Save the project with a name such as **Martinez Knight Prospect Mailer**.

## Step 2 — Deploy the Google mailer as a Web App

1. In Apps Script, select **Deploy → New deployment**.
2. Click the gear icon and choose **Web app**.
3. Set **Execute as** to **Me** (your Google account).
4. Set **Who has access** to **Anyone**. The script itself checks the private shared secret before sending any email.
5. Click **Deploy** and complete Google's authorisation prompts. Google may show an unverified-app warning because this is your own script; review that it is the script you just created before authorising.
6. Copy the Web App URL ending in `/exec`. Do not share the secret or URL publicly.

## Step 3 — Deploy the Supabase Edge Function

From the repository root, after installing the Supabase CLI and signing in:

```bash
supabase login
supabase link --project-ref fpzpjhlwnaatvvcwzntr
supabase functions deploy prospect-email
```

## Step 4 — Add Supabase Function Secrets

In Supabase Dashboard → Project → Edge Functions → Secrets, add:

| Name | Value |
|---|---|
| `GOOGLE_APPS_SCRIPT_URL` | The Web App URL copied in Step 2, ending in `/exec` |
| `GOOGLE_APPS_SCRIPT_SECRET` | The exact random secret you placed in `Code.gs` |
| `ADMIN_NOTIFICATION_EMAIL` | The Gmail inbox where you want to receive lead alerts; use `martinezknighthrmc@gmail.com` if that is still your preferred inbox |
| `WEBHOOK_SECRET` | A second, different long random secret for the Supabase database webhook |

Keep these secrets in Supabase Function Secrets only. Never put them in the website code, public repository files, or GitHub frontend variables. The Apps Script source contains a placeholder only; replace it privately in your own Apps Script editor.

## Step 5 — Create the Supabase Database Webhook

In Supabase Dashboard → Database → Webhooks → Create a new webhook:

1. Name: `prospect-email-notifications`.
2. Table: `public.prospects`.
3. Events: select **Insert** only.
4. Type: **Supabase Edge Functions**.
5. Function: `prospect-email`.
6. Method: `POST`.
7. Add header `x-webhook-secret` with the exact `WEBHOOK_SECRET` value from Step 4.
8. Save the webhook.

The Edge Function validates this header before forwarding the event to Google Apps Script. Apps Script separately validates its own secret before sending.

## Step 6 — Test the complete process

Submit one clearly labelled test entry through the public form using an email inbox you can access. Confirm:

- The row appears in Supabase Table Editor → `prospects`.
- Your admin Gmail inbox receives the new-prospect alert.
- The test prospect inbox receives the acknowledgement.
- The private pipeline shows the same record after administrator sign-in.

Google Apps Script executions and errors can be reviewed in the Apps Script **Executions** panel. The Gmail account is subject to Google's sending limits and anti-abuse policies; avoid bulk or unsolicited email.

If the database row is present but an email does not arrive, the lead itself is still stored. Check Apps Script → Executions and Supabase Edge Function logs.

## Public and private routes

- Public form: https://martinezknight.github.io/martinez-knight/business-discovery
- Private admin sign-in: https://martinezknight.github.io/martinez-knight/internal/prospects

The footer's **Admin Sign In** link only opens the sign-in route. It does not expose prospect records; the dashboard still requires an authorised Supabase Auth account and the existing Row Level Security policies.
