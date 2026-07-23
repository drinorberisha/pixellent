// Contact form -> Resend. Called by the form in index.html.
//
// Talks to the Resend REST API with plain fetch so the site stays
// dependency-free (no package.json, no node_modules, nothing to build).
//
// Environment variables (set in Vercel -> Project -> Settings -> Environment Variables):
//   RESEND_API_KEY  required — from https://resend.com/api-keys
//   CONTACT_TO      optional — where submissions land (default info@pixellent-solutions.com)
//   CONTACT_FROM    optional — sender (default "Pixellent <info@pixellent-solutions.com>")
//                              the domain must be verified in Resend first

const TO = process.env.CONTACT_TO || 'info@pixellent-solutions.com';
const FROM = process.env.CONTACT_FROM || 'Pixellent <info@pixellent-solutions.com>';

const MAX = { name: 100, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    // Misconfiguration, not the visitor's fault — say so plainly in the logs
    // but keep the public message generic.
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Email is not configured yet. Please email us directly.' });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};

  // Honeypot: real people never fill a hidden field. Pretend success so bots
  // do not learn they were caught.
  if (body.company) return res.status(200).json({ ok: true });

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const message = String(body.message || '').trim();

  const problems = [];
  if (!name) problems.push('name');
  if (!email || !EMAIL_RE.test(email)) problems.push('email');
  if (!message) problems.push('message');
  if (name.length > MAX.name || email.length > MAX.email || message.length > MAX.message) {
    problems.push('length');
  }
  if (problems.length) {
    return res.status(400).json({ error: 'Please check your name, a valid email, and a message.', fields: problems });
  }

  const text = `New enquiry from the pixellent site\n\n`
    + `Name:    ${name}\n`
    + `Email:   ${email}\n\n`
    + `${message}\n`;

  const html = `<div style="font-family:ui-monospace,Menlo,Consolas,monospace;background:#0a0a0e;color:#eef0ea;padding:24px">
  <div style="font-size:12px;color:#d6fb41;letter-spacing:.08em">// new enquiry — pixellent-solutions.com</div>
  <table style="margin:18px 0;border-collapse:collapse;font-size:14px">
    <tr><td style="color:#6b6c76;padding:4px 18px 4px 0">name</td><td>${esc(name)}</td></tr>
    <tr><td style="color:#6b6c76;padding:4px 18px 4px 0">email</td><td><a style="color:#d6fb41" href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
  </table>
  <div style="border-top:1px solid #2b2b33;padding-top:16px;font-size:15px;line-height:1.6;white-space:pre-wrap">${esc(message)}</div>
</div>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,          // hitting reply answers the visitor directly
        subject: `New enquiry from ${name}`,
        text,
        html,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error('Resend rejected the send:', r.status, detail);
      // 4xx from Resend is nearly always an unverified domain or a bad key —
      // surface a useful hint rather than a bare failure.
      return res.status(502).json({ error: 'Could not send right now. Please email us directly.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact send failed:', err);
    return res.status(502).json({ error: 'Could not send right now. Please email us directly.' });
  }
};
