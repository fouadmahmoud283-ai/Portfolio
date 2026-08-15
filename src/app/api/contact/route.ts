/**
 * @file Contact API Route Handler
 *
 * POST /api/contact
 *   Accepts a JSON body: { name, email, subject, message, honeypot? }
 *
 *   Processing pipeline (in order):
 *     1. Rate limiting  — 5 requests / minute / IP (429 on exceed)
 *     2. Body parsing   — 400 on invalid JSON
 *     3. Honeypot check — 200 fake-success for bots (hidden field filled)
 *     4. Validation     — 422 with field-level errors on invalid input
 *     5. Persistence    — save to local JSON store (best-effort, non-blocking)
 *     6. Email notify   — fire-and-forget; failure does not affect the response
 *     7. Success        — 200 with confirmation message
 *
 *   Any unexpected error returns 500.
 *
 * OPTIONS /api/contact
 *   CORS preflight handler — returns 204 with appropriate headers.
 */

import { contactSchema, validateInput } from '@/lib/validations';
import { saveContactSubmission } from '@/lib/storage';
import { sendContactNotification } from '@/lib/email';
import { contactRateLimiter, getClientIp } from '@/lib/rateLimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * CORS preflight handler.
 */
export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

/**
 * Handles contact form submissions.
 *
 * Validates, rate-limits, persists, and optionally emails the submission.
 * See file-level JSDoc for the full processing pipeline.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    // 1. Rate limiting -------------------------------------------------------
    const rateLimitResult = contactRateLimiter.check(getClientIp(request));
    if (!rateLimitResult.allowed) {
      return Response.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000)),
          },
        },
      );
    }

    // 2. Parse body ----------------------------------------------------------
    const body = await request.json().catch(() => null);
    if (body === null) {
      return Response.json(
        { success: false, error: 'Invalid request body.' },
        { status: 400 },
      );
    }

    // 3. Honeypot spam check -------------------------------------------------
    if (typeof body.honeypot === 'string' && body.honeypot.trim().length > 0) {
      // Pretend success so bots don't know they were caught.
      return Response.json(
        { success: true, message: 'Thank you for your message!' },
        { status: 200 },
      );
    }

    // 4. Validate ------------------------------------------------------------
    const result = validateInput(contactSchema, body);
    if (!result.success) {
      return Response.json(
        { success: false, error: 'Validation failed.', errors: result.errors },
        { status: 422 },
      );
    }

    // 5. Persist (best-effort — failure is logged but does not block) -------
    const { name, email, subject, message } = result.data;
    let submission;
    try {
      submission = await saveContactSubmission({ name, email, subject, message });
    } catch (persistError) {
      console.error('Failed to persist contact submission:', persistError);
    }

    // 6. Email notification (fire-and-forget — failure does not block) ------
    if (submission) {
      try {
        await sendContactNotification(submission);
      } catch (emailError) {
        console.error('Failed to send contact notification email:', emailError);
      }
    }

    // 7. Success -------------------------------------------------------------
    return Response.json(
      { success: true, message: 'Thank you for your message! I will get back to you soon.' },
      { status: 200 },
    );
  } catch (error) {
    // 8. Top-level error handling -------------------------------------------
    console.error('Unexpected error in contact route:', error);
    return Response.json(
      { success: false, error: 'Something went wrong. Please try again later.' },
      { status: 500 },
    );
  }
}

