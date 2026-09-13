// Email-only notifier — replaces formsubmit.co. Firestore stays the database
// (already wired into src/firebase.ts); this script just sends you an alert.
//
// Setup: go to script.google.com > New project, paste this in, then
// Deploy > New deployment > Web app.
//   Execute as: Me
//   Who has access: Anyone
// Copy the resulting /exec URL into VITE_NOTIFY_URL in the site's env.

const NOTIFY_EMAIL = 'shams.islam2@gmail.com';

function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  // Abort if honeypot field is filled
  if (data._honey) {
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: data._subject || 'New Dallas Clinicals inquiry',
    body: Object.entries(data)
      .filter(([key]) => key !== '_subject' && key !== '_honey' && key !== '_captcha')
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n') + '\n\nFull record is in Firestore — call them to complete intake.',
  });

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
