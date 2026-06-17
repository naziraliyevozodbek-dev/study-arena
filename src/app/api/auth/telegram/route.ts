import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken) {
      return NextResponse.json({ error: 'Telegram Bot Token not configured' }, { status: 500 });
    }

    const { hash, ...userData } = data;

    // Verify Telegram Auth Hash
    const secretKey = crypto.createHash('sha256').update(botToken).digest();
    const dataCheckString = Object.keys(userData)
      .sort()
      .map((key) => `${key}=${userData[key]}`)
      .join('\n');
    const hmac = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

    if (hmac !== hash) {
      return NextResponse.json({ error: 'Invalid authentication hash' }, { status: 401 });
    }

    // Check auth_date to prevent replay attacks (e.g., must be within 24 hours)
    const authDate = parseInt(userData.auth_date, 10);
    const now = Math.floor(Date.now() / 1000);
    if (now - authDate > 86400) {
      return NextResponse.json({ error: 'Authentication data expired' }, { status: 401 });
    }

    // Hash is valid!
    // In a real app, here you would:
    // 1. Check if the user exists in Supabase by telegram_id.
    // 2. If not, create them.
    // 3. Issue a JWT or create a session.
    // Since we are mocking the final step without a full admin token for custom claims,
    // we'll return success and let the client handle mock session state.
    
    return NextResponse.json({ success: true, user: userData });
  } catch (error) {
    console.error('Telegram auth error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
