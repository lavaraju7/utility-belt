import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { email, description } = await request.json();

        // Create a transporter using SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL, // Your admin email where you want to receive requests
            subject: 'New Utility Request from Utility Belt',
            html: `
        <h2>New Utility Request</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Description:</strong></p>
        <p>${description}</p>
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Request sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to send request' },
            { status: 500 }
        );
    }
} 