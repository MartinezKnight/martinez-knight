// Database Webhook handler for candidate and training form submissions.
const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "content-type, x-webhook-secret", "Access-Control-Allow-Methods": "POST, OPTIONS" };
const clean = (value: unknown) => String(value ?? "").trim() || "Not provided";
const html = (value: unknown) => clean(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] as string);
const display = (value: unknown) => Array.isArray(value) ? value.map(clean).join(", ") : clean(value);

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
    const allowed = ["candidate_applications", "training_applications"];
    if (payload.type !== "INSERT" || payload.schema !== "public" || !allowed.includes(payload.table)) {
      return new Response("Ignored event.", { status: 200, headers: corsHeaders });
    }

    const record = payload.record ?? {};
    if (!record.id || !record.full_name || !record.email) {
      return new Response("Invalid application record.", { status: 400, headers: corsHeaders });
    }

    const isCandidate = payload.table === "candidate_applications";
    const label = isCandidate ? "Candidate registration" : "Training application";
    const form = record.form_data ?? {};
    const details = Object.entries(form)
      .filter(([key]) => !["consent"].includes(key))
      .map(([key, value]) => `${key.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase())}: ${display(value)}`);
    const lines = [
      `A new ${label.toLowerCase()} was submitted.`, "",
      `Name: ${clean(record.full_name)}`,
      `Email: ${clean(record.email)}`,
      `Phone: ${clean(record.phone)}`,
      ...details,
      "", `Record ID: ${record.id}`,
    ];
    const internalText = lines.join("\n");
    const internalHtml = `<h2>New ${html(label.toLowerCase())}</h2><p><strong>Name:</strong> ${html(record.full_name)}<br><strong>Email:</strong> ${html(record.email)}<br><strong>Phone:</strong> ${html(record.phone)}</p><h3>Submitted details</h3><ul>${details.map(line => `<li>${html(line)}</li>`).join("")}</ul><p><strong>Record ID:</strong> ${html(record.id)}</p>`;
    const acknowledgementText = [
      `Hello ${clean(record.full_name)},`, "",
      `Thank you for submitting your ${label.toLowerCase()} to Martinez Knight.`,
      "We have received your details and our team will review your submission. If there is a suitable next step or opportunity, we will contact you using the details provided.",
      "", "Regards,", "Martinez Knight",
    ].join("\n");
    const acknowledgementHtml = `<p>Hello ${html(record.full_name)},</p><p>Thank you for submitting your ${html(label.toLowerCase())} to Martinez Knight.</p><p>We have received your details and our team will review your submission. If there is a suitable next step or opportunity, we will contact you using the details provided.</p><p>Regards,<br><strong>Martinez Knight</strong></p>`;

    const response = await fetch(mailerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: mailerSecret, adminEmail, prospectEmail: String(record.email).trim(),
        businessName: `${label} — ${clean(record.full_name)}`,
        internalText, internalHtml, acknowledgementText, acknowledgementHtml,
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success !== true) {
      console.error("Application email delivery failed:", result.error || response.status);
      return new Response("Email delivery failed. The application record remains saved.", { status: 502, headers: corsHeaders });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Application email handler failed:", error instanceof Error ? error.message : "Unknown error");
    return new Response("Unable to process application notification.", { status: 500, headers: corsHeaders });
  }
});
