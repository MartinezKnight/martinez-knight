// Supabase Database Webhook handler: forwards a new prospect to a private Google Apps Script mailer.
const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "content-type, x-webhook-secret", "Access-Control-Allow-Methods": "POST, OPTIONS" };
const clean = (value: unknown) => String(value ?? "").trim() || "Not provided";
const html = (value: unknown) => clean(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] as string);

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  const webhookSecret = Deno.env.get("WEBHOOK_SECRET");
  if (!webhookSecret || request.headers.get("x-webhook-secret") !== webhookSecret) {
    return new Response("Unauthorized", { status: 401, headers: corsHeaders });
  }

  const mailerUrl = Deno.env.get("GOOGLE_APPS_SCRIPT_URL");
  const mailerSecret = Deno.env.get("GOOGLE_APPS_SCRIPT_SECRET");
  const adminEmail = Deno.env.get("ADMIN_NOTIFICATION_EMAIL");
  if (!mailerUrl || !mailerSecret || !adminEmail) {
    return new Response("Email service is not fully configured.", { status: 503, headers: corsHeaders });
  }

  try {
    const payload = await request.json();
    if (payload.type !== "INSERT" || payload.table !== "prospects" || payload.schema !== "public") {
      return new Response("Ignored event.", { status: 200, headers: corsHeaders });
    }

    const lead = payload.record ?? {};
    if (!lead.id || !lead.business_name) return new Response("Invalid prospect record.", { status: 400, headers: corsHeaders });

    const form = lead.form_data ?? {};
    const isContactEnquiry = String(lead.source ?? "").toLowerCase().includes("contact form");
    const submissionLabel = isContactEnquiry ? "contact enquiry" : "business discovery submission";
    const preferredChannel = clean(form.preferredChannel);
    const challenge = Array.isArray(form.challenges) ? form.challenges.join(", ") : clean(form.challenges);
    const priority = clean(form.mainPriority);
    const outcomes = Array.isArray(form.desiredOutcomes) ? form.desiredOutcomes.join(", ") : clean(form.desiredOutcomes);
    const dashboardUrl = "https://martinezknight.com/internal/prospects";
    const email = String(lead.email ?? "").trim();

    const internalText = [
      `A new ${submissionLabel} has been submitted.`, "",
      `Business: ${clean(lead.business_name)}`,
      `Contact: ${clean(lead.contact_name)}`,
      `Email: ${clean(email)}`,
      `Phone: ${clean(lead.phone)}`,
      `Industry: ${clean(lead.industry)}`,
      `Location: ${clean(lead.location)}`,
      `Priority: ${priority}`,
      `Challenges: ${challenge}`,
      `Desired outcomes: ${outcomes}`,
      `Preferred channel: ${preferredChannel}`, "",
      `Review this prospect in the private pipeline: ${dashboardUrl}`,
    ].join("\n");

    const internalHtml = `<h2>New ${html(submissionLabel)}</h2><p><strong>Business:</strong> ${html(lead.business_name)}<br><strong>Contact:</strong> ${html(lead.contact_name)}<br><strong>Email:</strong> ${html(email)}<br><strong>Phone:</strong> ${html(lead.phone)}<br><strong>Industry:</strong> ${html(lead.industry)}<br><strong>Location:</strong> ${html(lead.location)}<br><strong>Priority:</strong> ${html(priority)}<br><strong>Challenges:</strong> ${html(challenge)}<br><strong>Desired outcomes:</strong> ${html(outcomes)}<br><strong>Preferred channel:</strong> ${html(preferredChannel)}</p><p><a href="${dashboardUrl}">Open the private prospect pipeline</a></p>`;

    const contact = html(lead.contact_name);
    const acknowledgementText = [
      `Hello ${clean(lead.contact_name)},`, "",
      "Thank you for taking the time to share information about your business with Martinez Knight.", "",
      `We have received your ${submissionLabel}. Our team will review the information you shared and get back to you through your preferred contact channel to discuss relevant next steps.`, "",
      "Thank you for considering Martinez Knight.", "", "Regards,", "Martinez Knight",
      "Digital Infrastructure & Business Transformation",
    ].join("\n");
    const acknowledgementHtml = `<p>Hello ${contact},</p><p>Thank you for taking the time to share information about your business with Martinez Knight.</p><p>We have received your ${html(submissionLabel)}. Our team will review the information you shared and get back to you through your preferred contact channel to discuss relevant next steps.</p><p>Thank you for considering Martinez Knight.</p><p>Regards,<br><strong>Martinez Knight</strong><br>Digital Infrastructure &amp; Business Transformation</p>`;

    const response = await fetch(mailerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: mailerSecret, adminEmail, prospectEmail: email,
        businessName: clean(lead.business_name), internalText, internalHtml,
        acknowledgementText, acknowledgementHtml, dashboardUrl,
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success !== true) {
      console.error("Google mailer rejected notification:", result.error || response.status);
      return new Response("Email delivery failed. The prospect record remains saved.", { status: 502, headers: corsHeaders });
    }

    return new Response(JSON.stringify({ success: true, internalSent: true, acknowledgementSent: Boolean(email) }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Prospect email handler failed:", error instanceof Error ? error.message : "Unknown error");
    return new Response("Unable to process prospect notification.", { status: 500, headers: corsHeaders });
  }
});
