import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import type { ContactSubmission, ResumeRequest } from './storage';

// ---------------------------------------------------------------------------
// Configuration (read from environment at call-time so changes take effect
// without a restart in serverless environments)
// ---------------------------------------------------------------------------

function getSmtpConfig() {
  return {
    host: process.env.SMTP_HOST ?? '',
    port: parseInt(process.env.SMTP_PORT ?? '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER ?? '',
    pass: process.env.SMTP_PASS ?? '',
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER ?? '',
    contactEmail: process.env.CONTACT_EMAIL ?? 'fouadmahmoud281@gmail.com',
  };
}

// ---------------------------------------------------------------------------
// Transporter (lazily created and cached)
// ---------------------------------------------------------------------------

let cachedTransporter: Transporter | null = null;

/**
 * Creates and caches a nodemailer transporter. Returns `null` when SMTP_HOST
 * is not configured so the app can run without email — callers should check
 * `isEmailConfigured()` or handle the null return.
 */
export function createTransport(): Transporter | null {
  const config = getSmtpConfig();

  if (!config.host) {
    return null;
  }

  if (cachedTransporter) {
    return cachedTransporter;
  }

  cachedTransporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  return cachedTransporter;
}

/**
 * Returns true only when all required SMTP credentials are present.
 */
export function isEmailConfigured(): boolean {
  const config = getSmtpConfig();
  return Boolean(config.host && config.user && config.pass);
}

// ---------------------------------------------------------------------------
// Email senders (never throw — return boolean success/failure)
// ---------------------------------------------------------------------------

/**
 * Sends a notification email to CONTACT_EMAIL summarising a new contact
 * form submission. Returns `true` on success, `false` on failure.
 */
export async function sendContactNotification(submission: ContactSubmission): Promise<boolean> {
  const config = getSmtpConfig();
  const transporter = createTransport();

  if (!transporter) {
    return false;
  }

  const textBody = [
    'New contact form submission',
    '===========================',
    '',
    `Name:    ${submission.name}`,
    `Email:   ${submission.email}`,
    `Subject: ${submission.subject}`,
    '',
    'Message:',
    submission.message,
    '',
    `Submitted at: ${submission.createdAt}`,
    `Submission ID: ${submission.id}`,
  ].join('\n');

  const htmlBody = `
    <h2>New Contact Form Submission</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Name:</td><td>${escapeHtml(submission.name)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email:</td><td>${escapeHtml(submission.email)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Subject:</td><td>${escapeHtml(submission.subject)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Submitted:</td><td>${escapeHtml(submission.createdAt)}</td></tr>
    </table>
    <h3 style="font-family:sans-serif;">Message</h3>
    <p style="font-family:sans-serif;white-space:pre-wrap;">${escapeHtml(submission.message)}</p>
    <hr>
    <p style="font-family:sans-serif;font-size:12px;color:#888;">Submission ID: ${escapeHtml(submission.id)}</p>
  `;

  try {
    await transporter.sendMail({
      from: config.from,
      to: config.contactEmail,
      replyTo: submission.email,
      subject: `Portfolio Contact: ${submission.subject}`,
      text: textBody,
      html: htmlBody,
    });
    return true;
  } catch (error) {
    console.error('Failed to send contact notification email:', error);
    return false;
  }
}

/**
 * Sends a notification email to CONTACT_EMAIL about a resume download
 * request. Returns `true` on success, `false` on failure.
 */
export async function sendResumeRequestNotification(request: ResumeRequest): Promise<boolean> {
  const config = getSmtpConfig();
  const transporter = createTransport();

  if (!transporter) {
    return false;
  }

  const purposeLine = request.purpose ? `Purpose: ${request.purpose}` : 'Purpose: (not specified)';

  const textBody = [
    'New resume download request',
    '===========================',
    '',
    `Email:   ${request.email}`,
    purposeLine,
    '',
    `Requested at: ${request.createdAt}`,
    `Request ID: ${request.id}`,
  ].join('\n');

  const htmlBody = `
    <h2>New Resume Download Request</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email:</td><td>${escapeHtml(request.email)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Purpose:</td><td>${escapeHtml(request.purpose ?? '(not specified)')}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Requested:</td><td>${escapeHtml(request.createdAt)}</td></tr>
    </table>
    <hr>
    <p style="font-family:sans-serif;font-size:12px;color:#888;">Request ID: ${escapeHtml(request.id)}</p>
  `;

  try {
    await transporter.sendMail({
      from: config.from,
      to: config.contactEmail,
      replyTo: request.email,
      subject: 'Portfolio: Resume Download Request',
      text: textBody,
      html: htmlBody,
    });
    return true;
  } catch (error) {
    console.error('Failed to send resume request notification email:', error);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

