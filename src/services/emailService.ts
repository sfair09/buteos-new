'use server';
/**
 * @fileOverview Email service using Nodemailer and SMTP.
 * Configuration is loaded from environment variables and secret manager.
 */

import nodemailer from 'nodemailer';
import { getSecret } from '@/utils/secrets';

export interface EmailPayload {
  to?: string; 
  subject: string;
  body: string; // Can be plain text or HTML
  fromName?: string; // Optional sender name
  replyTo?: string; // Optional reply-to address
}

// Create a Nodemailer transporter using IONOS SMTP
const createTransporter = async () => {
  const user = await getSecret('IONOS_SMTP_USER');
  const pass = await getSecret('IONOS_SMTP_PASS');
  
  return nodemailer.createTransport({
    host: process.env.IONOS_SMTP_HOST || 'smtp.ionos.com',
    port: Number(process.env.IONOS_SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: user,
      pass: pass
    },
  });
};

export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const { to, subject, body, fromName, replyTo } = payload;

  try {
    const transporter = await createTransporter();
    const user = await getSecret('IONOS_SMTP_USER');

    // Validate email address
    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email) && !email.includes('example.com');
    };

    const recipientEmail = to && isValidEmail(to) ? to : user;

    const mailOptions = {
      from: fromName ? `"${fromName}" <${user}>` : user,
      to: recipientEmail,
      replyTo: replyTo,
      subject: subject,
      html: body,
      text: body.replace(/<[^>]*>/g, ''), // Strip HTML tags for plain text version
    };

    if (!mailOptions.to) {
      console.error('Email not sent: No valid recipient address provided.');
      return { success: false, error: 'No valid recipient address specified.' };
    }

    console.log(`Attempting to send email via IONOS SMTP to: ${mailOptions.to}`);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully. Message ID:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message || 'Failed to send email.' };
  }
}
