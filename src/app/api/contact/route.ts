import { NextRequest, NextResponse } from 'next/server';
import { Inquiry } from '@/types/inquiry';
import { CONTACT_INFO } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const body: Inquiry = await request.json();

    const requiredFields = ['fullName', 'email', 'phone', 'projectLocation', 'projectType', 'message'];
    const missingFields = requiredFields.filter(field => !body[field as keyof Inquiry]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email format' 
        },
        { status: 400 }
      );
    }

    const phoneRegex = /^[+]?[0-9\s\-\(\)]+$/;
    if (!phoneRegex.test(body.phone) || body.phone.replace(/\D/g, '').length < 10) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid phone number format' 
        },
        { status: 400 }
      );
    }

    console.log('New inquiry received:', {
      ...body,
      timestamp: new Date().toISOString(),
    });
    const emailContent = `
      New Inquiry Received
      
      Name: ${body.fullName}
      Email: ${body.email}
      Phone: ${body.phone}
      Project Location: ${body.projectLocation}
      Project Type: ${body.projectType}
      
      Message:
      ${body.message}
      
      Timestamp: ${new Date().toISOString()}
    `;

    console.log('Email content to be sent:', emailContent);
    console.log('CRM integration data:', {
      contact_name: body.fullName,
      email: body.email,
      phone: body.phone,
      project_location: body.projectLocation,
      project_type: body.projectType,
      description: body.message,
      lead_source: 'Website Contact Form',
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your inquiry has been received successfully. We will contact you within 24 hours.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Contact API endpoint',
      contact: CONTACT_INFO
    },
    { status: 200 }
  );
}
