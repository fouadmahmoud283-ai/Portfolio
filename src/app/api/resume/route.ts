import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { incrementResumeDownload, incrementResumePreview } from '@/lib/storage';

export async function GET(request: NextRequest) {
  try {
    const action = request.nextUrl.searchParams.get('action') ?? 'download';
    const filePath = path.join(process.cwd(), 'public', 'Fouad Resume (1).pdf');

    let fileBuffer: Buffer;
    try {
      fileBuffer = await fs.readFile(filePath);
    } catch (err: unknown) {
      if (err instanceof Error && 'code' in err && (err as NodeJS.ErrnoException).code === 'ENOENT') {
        return NextResponse.json(
          { success: false, error: 'Resume not found' },
          { status: 404 },
        );
      }
      throw err;
    }

    if (action === 'preview') {
      await incrementResumePreview();
      const headers = new Headers({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="Fouad_Mahmoud_Resume.pdf"',
      });
      return new NextResponse(new Uint8Array(fileBuffer), { status: 200, headers });
    }

    // Default: download
    await incrementResumeDownload();
    const headers = new Headers({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Fouad_Mahmoud_Resume.pdf"',
    });
    return new NextResponse(new Uint8Array(fileBuffer), { status: 200, headers });
  } catch (error) {
    console.error('Resume route error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}


