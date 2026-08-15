import { NextResponse } from 'next/server';
import { getResumeAnalytics } from '@/lib/storage';

export async function GET() {
  try {
    const analytics = await getResumeAnalytics();
    return NextResponse.json({ success: true, data: analytics });
  } catch (error) {
    console.error('Resume analytics route error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}

