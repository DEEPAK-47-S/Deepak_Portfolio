import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // To use Gmail, the user must set these environment variables in Vercel
  // EMAIL_USER: skdeepakumar000@gmail.com
  // EMAIL_PASS: An App Password generated from Google Account Security
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'skdeepakumar000@gmail.com',
    subject: `New Portfolio Message from ${name} [Cyber Security Theme]`,
    text: `
      You have received a new message from your portfolio website:
      
      Name: ${name}
      Email: ${email}
      
      Message:
      ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, message: 'Failed to send message. Make sure Vercel env vars are set.' });
  }
}
