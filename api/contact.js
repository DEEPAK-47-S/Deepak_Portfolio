import nodemailer from 'nodemailer';

// Simple in-memory rate limiting map (IP -> { count, resetTime })
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Cleanup stale rate limit entries periodically
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);
if (typeof cleanupTimer.unref === 'function') {
  cleanupTimer.unref();
}

export default async function handler(req, res) {
  // Set standard API security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // 1. Method verification
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed. Only POST requests are supported.'
    });
  }

  // 2. Client IP extraction for rate limiting
  const forwarded = req.headers['x-forwarded-for'];
  const clientIp = typeof forwarded === 'string'
    ? forwarded.split(',')[0].trim()
    : (req.socket?.remoteAddress || 'unknown');

  const now = Date.now();
  const rateRecord = rateLimitMap.get(clientIp);

  if (rateRecord) {
    if (now < rateRecord.resetTime) {
      if (rateRecord.count >= MAX_REQUESTS_PER_WINDOW) {
        const retryAfterSeconds = Math.ceil((rateRecord.resetTime - now) / 1000);
        res.setHeader('Retry-After', retryAfterSeconds.toString());
        return res.status(429).json({
          success: false,
          message: `Too many messages sent. Please wait ${Math.ceil(retryAfterSeconds / 60)} minutes before trying again.`
        });
      }
      rateRecord.count += 1;
    } else {
      rateLimitMap.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    }
  } else {
    rateLimitMap.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
  }

  // 3. Request body parsing
  const body = req.body || {};
  const { name, email, message, honeypot } = body;

  // 4. Honeypot check for spam bots
  if (honeypot && String(honeypot).trim().length > 0) {
    // Silently succeed for bots without wasting SMTP quota
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully.'
    });
  }

  // 5. Input Validation & Sanitization
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid name (at least 2 characters).'
    });
  }

  if (name.length > 100) {
    return res.status(400).json({
      success: false,
      message: 'Name is too long (maximum 100 characters).'
    });
  }

  // Email format regex (RFC 5322 compliant subset)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.'
    });
  }

  if (email.length > 120) {
    return res.status(400).json({
      success: false,
      message: 'Email is too long (maximum 120 characters).'
    });
  }

  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a message of at least 5 characters.'
    });
  }

  if (message.length > 3000) {
    return res.status(400).json({
      success: false,
      message: 'Message exceeds the maximum length of 3000 characters.'
    });
  }

  const cleanName = name.trim().replace(/[\r\n\t]/g, ' ');
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  // 6. Environment variable check
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.log(`[CONTACT RECEIVED - DEV/PREVIEW MODE] From: "${cleanName}" <${cleanEmail}> | Message: "${cleanMessage}"`);
    return res.status(200).json({
      success: true,
      message: `Thank you ${cleanName}! Your message has been sent successfully.`
    });
  }

  // 7. Configure Nodemailer transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact Form" <${emailUser}>`,
    replyTo: cleanEmail,
    to: 'skdeepakumar000@gmail.com',
    subject: `Portfolio Message from ${cleanName} [Deepak Portfolio]`,
    text: `You have received a new contact submission from your portfolio website:\n\n` +
          `Name: ${cleanName}\n` +
          `Email: ${cleanEmail}\n` +
          `IP: ${clientIp}\n` +
          `Timestamp: ${new Date().toISOString()}\n\n` +
          `Message:\n${cleanMessage}\n`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #0b0f17; color: #f1f5f9; padding: 25px; border-radius: 10px; max-width: 600px; margin: auto; border: 1px solid #ef4444;">
        <h2 style="color: #ef4444; border-bottom: 1px solid rgba(239, 68, 68, 0.4); padding-bottom: 10px; margin-top: 0;">
          New Portfolio Message
        </h2>
        <p style="margin: 8px 0;"><strong style="color: #94a3b8;">From:</strong> ${escapeHtml(cleanName)}</p>
        <p style="margin: 8px 0;"><strong style="color: #94a3b8;">Email:</strong> <a href="mailto:${escapeHtml(cleanEmail)}" style="color: #38bdf8;">${escapeHtml(cleanEmail)}</a></p>
        <p style="margin: 8px 0;"><strong style="color: #94a3b8;">Time:</strong> ${new Date().toLocaleString()}</p>
        <div style="margin-top: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-left: 4px solid #ef4444; border-radius: 4px;">
          <p style="white-space: pre-wrap; margin: 0; line-height: 1.6; color: #ffffff;">${escapeHtml(cleanMessage)}</p>
        </div>
        <p style="margin-top: 25px; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; padding-top: 10px;">
          Directly reply to this email to respond to ${escapeHtml(cleanName)}.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.'
    });
  } catch (error) {
    console.error('Nodemailer send error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to deliver message via email service. Please try emailing skdeepakumar000@gmail.com directly.'
    });
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
