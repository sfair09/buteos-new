import { NextResponse } from 'next/server';
import { sendEmail } from '@/services/emailService';
import { format } from 'date-fns';

export async function POST(request: Request) {
  try {
    const { selectedTime, service, name, email, duration } = await request.json();

    if (!selectedTime || !service || !name || !email || !duration) {
      return NextResponse.json({ success: false, message: 'Missing required booking details.' }, { status: 400 });
    }

    const startTime = new Date(selectedTime);
    const endTime = new Date(startTime.getTime() + duration * 60 * 1000);

    const eventTitle = `Appointment: ${service} with ${name}`;
    const eventDescription = `Service: ${service}\nClient: ${name}\nEmail: ${email}\n\nBooked via ButeoBot AI.`;
    const eventLocation = 'Online Meeting'; // Or a specific address if applicable

    // Generate ICS content for "Add to Calendar"
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Buteos Systems//NONSGML v1.0//EN\nBEGIN:VEVENT\nUID:${Date.now()}@buteossystems.com\nDTSTAMP:${format(new Date(), 'yyyyMMddTHHmmss')}Z\nDTSTART:${format(startTime, 'yyyyMMddTHHmmss')}Z\nDTEND:${format(endTime, 'yyyyMMddTHHmmss')}Z\nSUMMARY:${eventTitle}\nDESCRIPTION:${eventDescription}\nLOCATION:${eventLocation}\nEND:VEVENT\nEND:VCALENDAR`;

    const calendarLink = `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;

    const emailBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #0056b3;">Appointment Confirmation - Buteos Systems</h2>
        <p>Dear ${name},</p>
        <p>Your appointment for <strong>${service}</strong> has been successfully booked!</p>
        <p><strong>Date:</strong> ${format(startTime, 'EEEE, MMMM do, yyyy')}</p>
        <p><strong>Time:</strong> ${format(startTime, 'h:mm a')} - ${format(endTime, 'h:mm a')}</p>
        <p>We look forward to connecting with you.</p>
        <p>
          <a href="${calendarLink}" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">
            Add to Calendar
          </a>
        </p>
        <p>For more information, visit our website: <a href="https://buteossystems.com" style="color: #0056b3;">buteossystems.com</a></p>
        <p>Best regards,</p>
        <p>The Buteos Systems Team</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 0.8em; color: #777;">This is an automated email, please do not reply.</p>
      </div>
    `;

    const emailSent = await sendEmail({
      to: email,
      subject: `Appointment Confirmation: ${service} - Buteos Systems`,
      body: emailBody,
      fromName: 'Buteos Systems Appointments',
    });

    if (emailSent.success) {
      return NextResponse.json({ success: true, message: 'Appointment booked and confirmation email sent!' });
    } else {
      console.error('Failed to send confirmation email:', emailSent.error);
      return NextResponse.json({ success: false, message: 'Appointment booked, but failed to send confirmation email.' }, { status: 500 });
    }

  } catch (error) {
    console.error('Error booking appointment or sending email:', error);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}
