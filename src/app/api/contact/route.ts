import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';
import { addMessage, getMessages } from '@/lib/storage';
import { verifyAdminToken } from '@/lib/auth';
import { sendContactNotification } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(request: Request): Promise<Response> {
  // Parse JSON body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Validate input
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: result.error.flatten() },
      { status: 400 },
    );
  }

  const { name, email, subject, message } = result.data;

  // Derive client IP
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor
    ? forwardedFor.split(',')[0].trim()
    : request.headers.get('x-real-ip') || undefined;

  // Persist message
  const savedMessage = addMessage({ name, email, subject, message, ip });

  // Best-effort email notification (never throws)
  await sendContactNotification(savedMessage);

  return NextResponse.json(
    { success: true, message: 'Message sent successfully', id: savedMessage.id },
    { status: 201 },
  );
}

export async function GET(request: Request): Promise<Response> {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ messages: getMessages() }, { status: 200 });
}

