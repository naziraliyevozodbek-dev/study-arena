import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { initData } = await request.json();
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken) {
      return NextResponse.json({ error: 'Telegram Bot Token not configured' }, { status: 500 });
    }

    if (!initData) {
      return NextResponse.json({ error: 'Missing initData' }, { status: 400 });
    }

    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    
    if (!hash) {
      return NextResponse.json({ error: 'Missing hash' }, { status: 400 });
    }

    urlParams.delete('hash');
    
    // Sort parameters alphabetically
    const paramsArray: string[] = [];
    urlParams.sort();
    urlParams.forEach((value, key) => {
      paramsArray.push(`${key}=${value}`);
    });
    
    const dataCheckString = paramsArray.join('\n');

    // Create secret key HMAC(WebAppData, botToken)
    const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
    
    // Generate HMAC signature
    const hmac = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

    if (hmac !== hash) {
      return NextResponse.json({ error: 'Invalid TWA authentication hash' }, { status: 401 });
    }

    // In a real application, you would log the user in by creating a session or JWT
    // Here we return success
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('TWA auth error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
