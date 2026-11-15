/**
 * Martinez Knight prospect email sender.
 * Deploy this script as a Web App that executes as your Google account.
 * Replace the placeholder with a long random secret and use the same value
 * for GOOGLE_APPS_SCRIPT_SECRET in Supabase Edge Function Secrets.
 */
const SHARED_SECRET = "REPLACE_WITH_A_LONG_RANDOM_SECRET";

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (!SHARED_SECRET || SHARED_SECRET === "REPLACE_WITH_A_LONG_RANDOM_SECRET" || data.secret !== SHARED_SECRET) {
      return json({ success: false, error: "Unauthorized" });
    }

    if (!data.adminEmail || !data.businessName) {
      return json({ success: false, error: "Missing required email details" });
    }

    const senderName = "Martinez Knight";
    const adminSubject = "New prospect: " + data.businessName;
    GmailApp.sendEmail(
      data.adminEmail,
      adminSubject,
      data.internalText || "A new prospect has submitted the business discovery form.",
      {
        htmlBody: data.internalHtml || "",
        name: senderName,
        ...(data.prospectEmail ? { replyTo: data.prospectEmail } : {}),
      }
    );

    let acknowledgementSent = false;
    if (data.prospectEmail) {
      GmailApp.sendEmail(
        data.prospectEmail,
        "Thank You for Sharing Your Business Goals with Martinez Knight",
        data.acknowledgementText || "Thank you. We have received your business discovery submission and will review it.",
        {
          htmlBody: data.acknowledgementHtml || "",
          name: senderName,
          replyTo: data.adminEmail,
        }
      );
      acknowledgementSent = true;
    }

    return json({ success: true, internalSent: true, acknowledgementSent: acknowledgementSent });
  } catch (error) {
    console.error(error);
    return json({ success: false, error: String(error) });
  }
}

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
