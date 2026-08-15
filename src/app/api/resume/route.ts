import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getStats, incrementDownloads, incrementPreviews } from '@/lib/storage';

const RESUME_FILE = path.join(process.cwd(), 'public', 'Fouad Resume (1).pdf');

export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  if (action === 'stats') {
    return NextResponse.json(getStats());
  }

  if (action === 'download' || action === 'preview') {
    if (!fs.existsSync(RESUME_FILE)) {
      return NextResponse.json({ error: 'Resume file not found' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(RESUME_FILE);

    if (action === 'download') {
      incrementDownloads();
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="Fouad_Mahmoud_Resume.pdf"',
          'Content-Length': fileBuffer.length.toString(),
        },
      });
    }

    // action === 'preview'
    incrementPreviews();
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="Fouad_Mahmoud_Resume.pdf"',
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  }

  return NextResponse.json(
    { error: 'Invalid action. Use ?action=download|preview|stats' },
    { status: 400 },
  );
}

