/**
 * Portfolio contact form → Google Sheet (+ email alert)
 * ------------------------------------------------------
 * SETUP (one time, ~5 minutes):
 *  1. Create a new Google Sheet (e.g. "Portfolio Messages").
 *  2. In the sheet: Extensions → Apps Script. Delete the sample code and paste ALL of this file.
 *  3. Click Save, then Deploy → New deployment → gear icon → "Web app".
 *       - Description:     Portfolio form
 *       - Execute as:      Me
 *       - Who has access:  Anyone
 *     Click Deploy, allow the permissions (Advanced → Go to project → Allow).
 *  4. Copy the "Web app URL" (ends in /exec) and paste it into GOOGLE_SHEET_URL in script.js.
 *
 * If you edit this code later: Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy.
 * (The URL stays the same.)
 */

const NOTIFY_EMAIL = "prajwalcj1702@gmail.com"; // set to "" to turn off email alerts
const SHEET_NAME = "Messages";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const p = (e && e.parameter) || {};

    // simple spam guard: hidden field must be empty, and keep fields to sane lengths
    if (p._gotcha) return json({ ok: true });
    const name = String(p.name || "").slice(0, 200).trim();
    const email = String(p.email || "").slice(0, 200).trim();
    const message = String(p.message || "").slice(0, 5000).trim();
    if (!name || !email || !message) return json({ ok: false, error: "missing fields" });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(["Received (IST)", "Name", "Email", "Message", "Page"]);
      sheet.getRange(1, 1, 1, 5).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    const time = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd MMM yyyy, hh:mm a");
    // prefix with ' so a message starting with = + - @ is stored as text, not run as a formula
    const safe = (v) => (/^[=+\-@]/.test(v) ? "'" + v : v);
    sheet.appendRow([time, safe(name), safe(email), safe(message), String(p.page || "")]);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        replyTo: email,
        subject: "📬 Portfolio message from " + name,
        body: message + "\n\n— " + name + " <" + email + ">\nReceived: " + time + "\n\nAll messages: " + ss.getUrl(),
      });
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
