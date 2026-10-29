import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function fromBase64Url(s: string): string {
  let b64 = s.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';
  return Buffer.from(b64, 'base64').toString('utf-8');
}

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('u');
  if (!raw) return new NextResponse('missing u', { status: 400 });

  let u: string;
  let target: URL;
  try {
    u = fromBase64Url(raw);
    target = new URL(u);
  } catch {
    return new NextResponse('bad url', { status: 400 });
  }

  if (!target.hostname.endsWith('fbcdn.net') && !target.hostname.endsWith('facebook.com')) {
    return new NextResponse('forbidden host', { status: 403 });
  }

  const upstream = await fetch(target.toString(), {
    cache: 'no-store',
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; FalconDashboard/1.0)' },
  });
  if (!upstream.ok || !upstream.body) {
    return new NextResponse('upstream error', { status: 502 });
  }

  const contentType = upstream.headers.get('content-type') || 'image/jpeg';
  return new NextResponse(upstream.body, {
    headers: {
      'content-type': contentType,
      'cache-control': 'public, max-age=21600, s-maxage=21600',
    },
  });
}
