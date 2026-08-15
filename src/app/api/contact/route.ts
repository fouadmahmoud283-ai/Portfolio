import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';
import { appendMessage, getMessages, randomUUID } from '@/lib/storage';
import type { ContactMessage } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: result.error.flatten() },
        { status: 400 },
      );
    }

    const { name, email, subject, message } = result.data;

    const contactMessage: ContactMessage = {
      id: randomUUID(),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      read: false,
    };

    await appendMessage(contactMessage);

    return NextResponse.json(
      { success: true, data: contactMessage },
      { status: 201 },
    );
  } catch (error) {
    console.error('POST /api/contact error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}

// NOTE: No auth gate for this portfolio demo. In production, protect with admin auth.
export async function GET() {
  try {
    const messages = await getMessages();

    return NextResponse.json(
      { success: true, data: messages },
    );
  } catch (error) {
    console.error('GET /api/contact error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}

