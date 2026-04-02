// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { CONTACT_INFO } from '@/lib/constants';
import type { Inquiry } from '@/types/inquiry';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  try {
    const body: Inquiry = await request.json();

    const requiredFields: (keyof Inquiry)[] = [
      'fullName',
      'email',
      'phone',
      'projectLocation',
      'projectType',
      'message',
    ];

    const missingFields = requiredFields.filter((f) => !body[f]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(', ')}`,
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    const phoneRegex = /^[+]?[0-9\s\-()+]+$/;
    if (!phoneRegex.test(body.phone) || body.phone.replace(/\D/g, '').length < 10) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    if (BACKEND_URL) {
      try {
        const res = await fetch(`${BACKEND_URL}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
      } catch {
      }
    }
    const timestamp = new Date().toISOString();

    console.log('New inquiry received:', { ...body, timestamp });

    const emailContent = `
New Inquiry Received

Name:             ${body.fullName}
Email:            ${body.email}
Phone:            ${body.phone}
Project Location: ${body.projectLocation}
Project Type:     ${body.projectType}

Message:
${body.message}

Timestamp: ${timestamp}
    `.trim();

    console.log('Email content to be sent:', emailContent);

    console.log('CRM integration data:', {
      contact_name:     body.fullName,
      email:            body.email,
      phone:            body.phone,
      project_location: body.projectLocation,
      project_type:     body.projectType,
      description:      body.message,
      lead_source:      'Website Contact Form',
      timestamp,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          'Your inquiry has been received. We will contact you within 24 hours.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}


export async function GET() {
  return NextResponse.json(
    {
      message: 'Contact API endpoint',
      contact: CONTACT_INFO,
    },
    { status: 200 }
  );
}