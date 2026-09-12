/**
 * Ekam Yoga Studio — group class registration recorder.
 *
 * What this does: every time someone submits the "Reserve my spot" form
 * on the website, the site POSTs their details here, and this script
 * appends one row to the connected Google Sheet.
 *
 * ---- One-time setup ----
 * 1. Open the Google Sheet that should collect registrations.
 * 2. Extensions -> Apps Script.
 * 3. Delete whatever is in Code.gs and paste this whole file in its place.
 * 4. Click Deploy -> New deployment.
 *    - Select type: Web app.
 *    - Execute as: Me.
 *    - Who has access: Anyone.
 * 5. Click Deploy, and authorize it when Google asks (it's your own
 *    script touching your own sheet).
 * 6. Copy the "Web app URL" you're given — it ends in /exec.
 * 7. Give that URL to whoever maintains the website (or set it yourself
 *    as the VITE_GROUP_REGISTRATION_ENDPOINT repository secret/variable
 *    — see the main README for exactly where).
 *
 * If you ever change the form's fields, update the SHEET_HEADERS list
 * and the row it appends below to match, then redeploy (Deploy -> Manage
 * deployments -> edit -> New version).
 */

var SHEET_HEADERS = ["Submitted at", "Name", "Email", "Class", "Notes"];

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(SHEET_HEADERS);
  }

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.email || "",
    data.className || "",
    data.notes || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
