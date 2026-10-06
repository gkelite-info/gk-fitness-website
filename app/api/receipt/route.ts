import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const file = searchParams.get('file');

  if (!file) {
    return new NextResponse('File parameter is required', { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';

  let cleanFile = file;
  if (cleanFile.includes('/storage/v1/object/public/gym-expenses/')) {
    cleanFile = cleanFile.split('/storage/v1/object/public/gym-expenses/')[1];
  }

  const fileUrl = `${supabaseUrl}/storage/v1/object/public/gym-expenses/${cleanFile}`;

  try {
    const response = await fetch(fileUrl);

    if (!response.ok) {
      return new NextResponse('File not found', { status: 404 });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const contentType = response.headers.get('content-type') || 'application/octet-stream';

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${cleanFile}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error proxying receipt:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
