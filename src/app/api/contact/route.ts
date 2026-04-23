import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import { getSecret } from '@/utils/secrets';
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { 
    name, 
    company, 
    email, 
    phone, 
    website, 
    socialMedia, 
    projectType, 
    preferredContactDate, 
    preferredContactTime, 
    message 
  } = body;

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
  }

  try {
    const user = await getSecret('IONOS_SMTP_USER')
    const pass = await getSecret('IONOS_SMTP_PASS')
    const transporter = nodemailer.createTransport({
      host: process.env.IONOS_SMTP_HOST || 'smtp.ionos.com',
      port: Number(process.env.IONOS_SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: user,
        pass: pass
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${user}>`,
      to: user,
      subject: `New Contact Form Submission (${projectType})`,
      replyTo: email,
      text: `Name: ${name}
Company: ${company}
Email: ${email}
Phone: ${phone}
Website: ${website || 'Not provided'}
Social Media: ${socialMedia || 'Not provided'}
Service Level: ${projectType}
Preferred Contact Date: ${preferredContactDate || 'Not specified'}
Preferred Contact Time: ${preferredContactTime || 'Not specified'}
Message: ${message}`,
      html: `<p><b>Name:</b> ${name}</p>
             <p><b>Company:</b> ${company}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Phone:</b> ${phone}</p>
             <p><b>Website:</b> ${website || 'Not provided'}</p>
             <p><b>Social Media:</b> ${socialMedia || 'Not provided'}</p>
             <p><b>Service Level:</b> ${projectType}</p>
             <p><b>Preferred Contact Date:</b> ${preferredContactDate || 'Not specified'}</p>
             <p><b>Preferred Contact Time:</b> ${preferredContactTime || 'Not specified'}</p>
             <p><b>Message:</b><br/>${message}</p>`
    });

    return new Response(JSON.stringify({ message: "Thank you for your message! We'll get back to you shortly." }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'There was an error sending your message. Please try again.' }), { status: 500 });
  }
}