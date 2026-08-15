/**
 * @file Resume API Route Handler
 *
 * POST /api/resume
 *   Accepts a JSON body: { email, purpose? }
 *   Records who requested the resume, then returns the resume URL.
 *
 *   Processing pipeline (in order):
 *     1. Rate limiting  — 20 requests / minute / IP (429 on exceed)
 *     2. Body parsing   — 400 on invalid JSON
 *     3. Validation     — 422 with field-level errors on invalid input
 *     4. Persistence    — save request to local JSON store (best-effort)
 *     5. Email notify   — fire-and-forget; failure does not affect the response
 *     6. Success        — 200 with resume URL and confirmation message
 *
 *   Any unexpected error returns 500.
 *
 * GET /api/resume
 *   Streams the resume PDF directly from the public/ directory.
 *   Returns 404 if the file is missing, 500 on unexpected errors.
 *
 * OPTIONS /api/resume
 *   CORS preflight handler — returns 204 with appropriate headers.
 */

import fs from 'node:fs';
import path from 'node:path';

import { resumeRequestSchema, validateInput } from '@/lib/validations';
import { saveResumeRequest } from '@/lib/storage';
import { sendResumeRequestNotification } from '@/lib/email';
import { resumeRateLimiter, getClientIp } from '@/lib/rateLimit';
import { RESUME_FILENAME, RESUME_PATH } from '@/utils/resumeUtils';

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
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

/**
 * Handles a resume download request.
 *
 * Validates the requester's email, persists the request for analytics,
 * sends an optional email notification, then returns the resume URL.
 * See file-level JSDoc for the full processing pipeline.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    // 1. Rate limiting -------------------------------------------------------
    const rateLimitResult = resumeRateLimiter.check(getClientIp(request));
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

    // 3. Validate ------------------------------------------------------------
    const result = validateInput(resumeRequestSchema, body);
    if (!result.success) {
      return Response.json(
        { success: false, error: 'Validation failed.', errors: result.errors },
        { status: 422 },
      );
    }

    // 4. Persist the request (best-effort — failure is logged but does not block)
    const { email, purpose } = result.data;
    let savedRequest;
    try {
      savedRequest = await saveResumeRequest({ email, purpose });
    } catch (persistError) {
      console.error('Failed to persist resume request:', persistError);
    }

    // 5. Email notification (fire-and-forget — failure does not block) -------
    if (savedRequest) {
      try {
        await sendResumeRequestNotification(savedRequest);
      } catch (emailError) {
        console.error('Failed to send resume request notification email:', emailError);
      }
    }

    // 6. Resolve resume URL and return success -------------------------------
    return Response.json(
      { success: true, url: RESUME_PATH, message: 'Resume download authorized.' },
      { status: 200 },
    );
  } catch (error) {
    // 7. Top-level error handling -------------------------------------------
    console.error('Unexpected error in resume route:', error);
    return Response.json(
      { success: false, error: 'Something went wrong. Please try again later.' },
      { status: 500 },
    );
  }
}

/**
 * Serves the resume PDF file directly for download.
 *
 * Reads the PDF from the public/ directory and returns it with the
 * appropriate Content-Type and Content-Disposition headers. Returns
 * 404 if the file does not exist.
 */
export async function GET(): Promise<Response> {
  try {
    const filePath = path.join(process.cwd(), 'public', RESUME_FILENAME);

    if (!fs.existsSync(filePath)) {
      return Response.json(
        { success: false, error: 'Resume file not found.' },
        { status: 404 },
      );
    }

    const fileBuffer = await fs.promises.readFile(filePath);
    const fileUint8 = new Uint8Array(fileBuffer);

    return new Response(fileUint8, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Fouad-Mahmoud-Resume.pdf"',
      },
    });
  } catch (error) {
    console.error('Unexpected error serving resume file:', error);
    return Response.json(
      { success: false, error: 'Something went wrong. Please try again later.' },
      { status: 500 },
    );
  }
}


