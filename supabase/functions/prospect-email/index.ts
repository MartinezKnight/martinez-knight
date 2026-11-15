// Supabase Database Webhook handler: sends an internal lead alert and a prospect acknowledgement.
const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "content-type, x-webhook-secret", "Access-Control-Allow-Methods": "POST, OPTIONS" };

const escapeHtml = (value: unknown) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] as string);
const clean = (value: unknown) => String(value ?? "").trim() || "Not provided";

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  const webhookSecret = Deno.env.get("WEBHOOK_SECRET");
  if (!webhookSecret || request.headers.get("x-webhook-secret") !== webhookSecret) {
    return new Response("Unauthorized", { status: 401, headers: corsHeaders });
  }

  const resendKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("EMAIL_FROM");
  const adminEmail = Deno.env.get("ADMIN_NOTIFICATION_EMAIL");
  if (!resendKey || !from || !adminEmail) {
    return new Response("Email service is not fully configured.", { status: 503, headers: corsHeaders });
  }

  try {
    const payload = await request.json();
    if (payload.type !== "INSERT" || payload.table !== "prospects" || payload.schema !== "public") {
      return new Response("Ignored event.", { status: 200, headers: corsHeaders });
    }

    const lead = payload.record ?? {};
    if (!lead.id || !lead.business_name) return new Response("Invalid prospect record.", { status: 400, headers: corsHeaders });

    const business = clean(lead.business_name);
    const contact = clean(lead.contact_name);
    const email = String(lead.email ?? "").trim();
    const phone = clean(lead.phone);
    const industry = clean(lead.industry);
    const location = clean(lead.location);
    const form = lead.form_data ?? {};
    const preferredChannel = clean(form.preferredChannel);
    const challenge = Array.isArray(form.challenges) ? form.challenges.join(", ") : clean(form.challenges);
    const priority = clean(form.mainPriority);
    const outcomes = Array.isArray(form.desiredOutcomes) ? form.desiredOutcomes.join(", ") : clean(form.desiredOutcomes);
    const dashboardUrl = "https://martinezknight.github.io/martinez-knight/internal/prospects";

    const internalText = [
      "A new business discovery form has been submitted.",
      "",
      `Business: ${business}`,
      `Contact: ${contact}`,
      `Email: ${clean(email)}`,
      `Phone: ${phone}`,
      `Industry: ${industry}`,
      `Location: ${location}`,
      `Priority: ${priority}`,
      `Challenges: ${challenge}`,
      `Desired outcomes: ${outcomes}`,
      `Preferred channel: ${preferredChannel}`,
      "",
      `Review this prospect in the private pipeline: ${dashboardUrl}`,
    ].join("\n");

    const internalHtml = `<h2>New business discovery submission</h2><p><strong>Business:</strong> ${escapeHtml(business)}<br><strong>Contact:</strong> ${escapeHtml(contact)}<br><strong>Email:</strong> ${escapeHtml(clean(email))}<br><strong>Phone:</strong> ${escapeHtml(phone)}<br><strong>Industry:</strong> ${escapeHtml(industry)}<br><strong>Location:</strong> ${escapeHtml(location)}<br><strong>Priority:</strong> ${escapeHtml(priority)}<br><strong>Challenges:</strong> ${escapeHtml(challenge)}<br><strong>Desired outcomes:</strong> ${escapeHtml(outcomes)}<br><strong>Preferred channel:</strong> ${escapeHtml(preferredChannel)}</p><p><a href="${dashboardUrl}">Open the private prospect pipeline</a></p>`;

    const send = async (body: Record<string, unknown>) => {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || result.name || "Email delivery failed.");
      return result;
    };

    const messages = [send({
      from,
      to: [adminEmail],
      subject: `New prospect: ${business}`,
      text: internalText,
      html: internalHtml,
      ...(email ? { reply_to: email } : {}),
    })];

    if (email) {
      const acknowledgementText = [
        `Hello ${contact},`,
        "",
        "Thank you for taking the time to share information about your business with Martinez Knight.",
        "",
        "We have received your business discovery submission. Our team will review your business context, current challenges and growth priorities, then get back to you through your preferred contact channel to discuss our observations, relevant opportunities and practical next steps.",
        "",
        "Thank you for considering Martinez Knight.",
        "",
        "Regards,",
        "Martinez Knight",
        "Digital Infrastructure & Business Transformation",
      ].join("\n");
      const acknowledgementHtml = `<p>Hello ${escapeHtml(contact)},</p><p>Thank you for taking the time to share information about your business with Martinez Knight.</p><p>We have received your business discovery submission. Our team will review your business context, current challenges and growth priorities, then get back to you through your preferred contact channel to discuss our observations, relevant opportunities and practical next steps.</p><p>Thank you for considering Martinez Knight.</p><p>Regards,<br><strong>Martinez Knight</strong><br>Digital Infrastructure &amp; Business Transformation</p>`;
      messages.push(send({
        from,
        to: [email],
        subject: "Thank You for Sharing Your Business Goals with Martinez Knight",
        text: acknowledgementText,
        html: acknowledgementHtml,
        reply_to: adminEmail,
      }));
    }

    const results = await Promise.all(messages);
    return new Response(JSON.stringify({ success: true, sent: results.length }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Prospect email handler failed:", error instanceof Error ? error.message : "Unknown error");
    return new Response("Unable to process prospect notification.", { status: 500, headers: corsHeaders });
  }
});
