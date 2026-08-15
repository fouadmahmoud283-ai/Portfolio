/**
 * Optional email notification layer.
 *
 * Email is best-effort: if SMTP is not configured the function resolves
 * immediately, and if sending fails the error is logged but never thrown.
 * The contact message is already persisted in storage before this runs.
 */

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS,
  );
}

export async function sendContactNotification(message: {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}): Promise<void> {
  if (!isEmailConfigured()) {
    return;
  }

  try {
    const nodemailer = await import('nodemailer');

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const from = process.env.SMTP_FROM || process.env.SMTP_USER;
    const to = process.env.CONTACT_EMAIL || 'fouadmahmoud281@gmail.com';

    await transporter.sendMail({
      from,
      to,
      subject: `Portfolio Contact: ${message.subject}`,
      text: [
        `New contact form submission`,
        ``,
        `Name:    ${message.name}`,
        `Email:   ${message.email}`,
        `Subject: ${message.subject}`,
        `Date:    ${message.createdAt}`,
        ``,
        `Message:`,
        message.message,
      ].join('\n'),
    });
  } catch (err) {
    console.error('[email] Failed to send contact notification:', err);
  }
}

