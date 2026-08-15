import { NextRequest, NextResponse } from 'next/server';
import { subscribeSchema } from '@/lib/validation';
import { appendSubscriber, getSubscribers, randomUUID } from '@/lib/storage';
import type { Subscriber } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = subscribeSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: result.error.flatten() },
        { status: 400 },
      );
    }

    const { email, source } = result.data;

    const existingSubscribers = await getSubscribers();
    const existing = existingSubscribers.find(
      (sub) => sub.email.toLowerCase() === email.toLowerCase(),
    );

    if (existing) {
      return NextResponse.json(
        { success: true, data: existing, message: 'Already subscribed' },
        { status: 200 },
      );
    }

    const subscriber: Subscriber = {
      id: randomUUID(),
      email,
      subscribedAt: new Date().toISOString(),
      source: source || 'footer',
    };

    await appendSubscriber(subscriber);

    return NextResponse.json(
      { success: true, data: subscriber },
      { status: 201 },
    );
  } catch (error) {
    console.error('POST /api/subscribe error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}

