import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/services/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, body: emailBody } = body;

    const result = await sendEmail({
      to,
      subject: subject || 'Test Email from ButeoBot',
      body: emailBody || 'This is a test email from the ButeoBot system.',
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in test email endpoint:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send test email' },
      { status: 500 }
    );
  }
} 