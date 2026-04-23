import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/services/emailService';

export async function POST(request: NextRequest) {
  try {
    const { email, name, company, position } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Send download email to user
    await sendEmail({
      to: email,
      subject: 'Your Free Digital Marketing Guide - Download Link Inside',
      body: `
        <h2>Thank you for your interest!</h2>
        <p>Here's your free Digital Marketing Guide download link:</p>
        <p><a href="https://storage.googleapis.com/buteos-res/Digital_Renovation_%20V1.pdf" style="background: #13699a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Download Your Guide</a></p>
        <p>Best regards,<br>The Buteos Systems Team</p>
      `
    });

    // Send notification email to admin
    await sendEmail({
      subject: 'New E-Book Download - Lead Notification',
      body: `
        <h2>New E-Book Download</h2>
        <p><strong>Name:</strong> ${name || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Position:</strong> ${position || 'Not provided'}</p>
        <p><strong>Downloaded:</strong> Digital Renovation Guide</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Download email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}