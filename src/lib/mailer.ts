import { Inquiry } from '@/types/inquiry';
import { CONTACT_INFO, SITE_NAME } from './constants';

interface EmailConfig {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendEmail(config: EmailConfig): Promise<EmailResponse> {
  try {
    
    console.log('=== EMAIL CONFIGURATION ===');
    console.log('To:', config.to);
    console.log('Subject:', config.subject);
    console.log('From:', config.from || CONTACT_INFO.email);
    console.log('Reply-To:', config.replyTo);
    console.log('HTML Length:', config.html.length);
    console.log('===========================');

    const mockResponse = await mockEmailService(config);
    
    return mockResponse;
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

async function mockEmailService(config: EmailConfig): Promise<EmailResponse> {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };
}

export async function sendInquiryConfirmation(inquiry: Inquiry): Promise<EmailResponse> {
  const subject = `Thank You for Your Inquiry - ${SITE_NAME}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You - ${SITE_NAME}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #111827; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px 20px; background: #f9fafb; }
        .footer { background: #111827; color: white; padding: 20px; text-align: center; font-size: 14px; }
        .btn { display: inline-block; padding: 12px 24px; background: #111827; color: white; text-decoration: none; border-radius: 4px; margin: 10px 0; }
        .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .details h3 { color: #111827; margin-top: 0; }
        .details p { margin: 5px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${SITE_NAME}</h1>
          <p>Transforming Spaces, Inspiring Lives</p>
        </div>
        
        <div class="content">
          <h2>Thank You for Your Inquiry!</h2>
          <p>Dear ${inquiry.fullName},</p>
          <p>We have received your inquiry and are excited about the possibility of working with you on your ${inquiry.projectType} project in ${inquiry.projectLocation}.</p>
          
          <p>Our team will review your requirements and get back to you within 24 hours to discuss your project in detail.</p>
          
          <div class="details">
            <h3>Your Inquiry Details:</h3>
            <p><strong>Name:</strong> ${inquiry.fullName}</p>
            <p><strong>Email:</strong> ${inquiry.email}</p>
            <p><strong>Phone:</strong> ${inquiry.phone}</p>
            <p><strong>Project Type:</strong> ${inquiry.projectType}</p>
            <p><strong>Project Location:</strong> ${inquiry.projectLocation}</p>
            <p><strong>Message:</strong> ${inquiry.message}</p>
          </div>
          
          <p>In the meantime, feel free to explore our portfolio and learn more about our services:</p>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.interiorstudioltd.com'}/projects" class="btn">View Our Projects</a>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.interiorstudioltd.com'}/services" class="btn">Our Services</a>
          </div>
          
          <p>Best regards,<br>The ${SITE_NAME} Team</p>
        </div>
        
        <div class="footer">
          <p>&copy; 2024 ${SITE_NAME}. All rights reserved.</p>
          <p>${CONTACT_INFO.address}</p>
          <p>Email: ${CONTACT_INFO.email} | Phone: ${CONTACT_INFO.phone}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: inquiry.email,
    subject,
    html,
    replyTo: CONTACT_INFO.email,
  });
}

export async function sendInquiryNotification(inquiry: Inquiry): Promise<EmailResponse> {
  const subject = `New Inquiry: ${inquiry.projectType} Project - ${inquiry.fullName}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Inquiry - ${SITE_NAME}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #111827; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px 20px; background: #f9fafb; }
        .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .details h3 { color: #111827; margin-top: 0; }
        .details p { margin: 5px 0; }
        .urgent { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; }
        .btn { display: inline-block; padding: 12px 24px; background: #111827; color: white; text-decoration: none; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Inquiry Received!</h1>
          <p>${SITE_NAME} - Lead Management System</p>
        </div>
        
        <div class="content">
          <div class="urgent">
            <strong>🚨 New Lead Alert!</strong><br>
            A potential client has submitted an inquiry for a ${inquiry.projectType} project.
          </div>
          
          <div class="details">
            <h3>Client Information:</h3>
            <p><strong>Name:</strong> ${inquiry.fullName}</p>
            <p><strong>Email:</strong> ${inquiry.email}</p>
            <p><strong>Phone:</strong> ${inquiry.phone}</p>
            <p><strong>Project Type:</strong> ${inquiry.projectType}</p>
            <p><strong>Project Location:</strong> ${inquiry.projectLocation}</p>
          </div>
          
          <div class="details">
            <h3>Project Details:</h3>
            <p>${inquiry.message}</p>
          </div>
          
          <div class="details">
            <h3>Submission Details:</h3>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Source:</strong> Website Contact Form</p>
          </div>
          
          <p style="text-align: center;">
            <a href="mailto:${inquiry.email}" class="btn">Reply to Client</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: CONTACT_INFO.email,
    subject,
    html,
  });
}

export async function sendProjectCompletionNotification(
  clientEmail: string,
  projectName: string,
  projectType: string
): Promise<EmailResponse> {
  const subject = `Your ${projectType} Project is Complete!`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Project Complete - ${SITE_NAME}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #111827; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px 20px; background: #f9fafb; }
        .celebration { text-align: center; font-size: 48px; margin: 20px 0; }
        .btn { display: inline-block; padding: 12px 24px; background: #111827; color: white; text-decoration: none; border-radius: 4px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${SITE_NAME}</h1>
          <p>Transforming Spaces, Inspiring Lives</p>
        </div>
        
        <div class="content">
          <div class="celebration">🎉</div>
          <h2>Your Project is Complete!</h2>
          <p>Dear Client,</p>
          <p>We're thrilled to announce that your ${projectType} project "<strong>${projectName}</strong>" has been successfully completed!</p>
          
          <p>The space is now ready for you to enjoy. We hope it exceeds your expectations and brings you joy for years to come.</p>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.interiorstudioltd.com'}/contact" class="btn">Schedule Final Walkthrough</a>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.interiorstudioltd.com'}/contact" class="btn">Leave a Review</a>
          </div>
          
          <p>Thank you for trusting ${SITE_NAME} with your project. We appreciate the opportunity to transform your space.</p>
          
          <p>Best regards,<br>The ${SITE_NAME} Team</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: clientEmail,
    subject,
    html,
  });
}

export async function sendNewsletterConfirmation(email: string): Promise<EmailResponse> {
  const subject = `Newsletter Subscription Confirmed - ${SITE_NAME}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Newsletter Confirmed - ${SITE_NAME}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #111827; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px 20px; background: #f9fafb; }
        .btn { display: inline-block; padding: 12px 24px; background: #111827; color: white; text-decoration: none; border-radius: 4px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${SITE_NAME}</h1>
          <p>Transforming Spaces, Inspiring Lives</p>
        </div>
        
        <div class="content">
          <h2>Welcome to Our Newsletter!</h2>
          <p>Thank you for subscribing to our newsletter. You'll now receive updates about:</p>
          <ul>
            <li>Latest interior design trends</li>
            <li>Project showcases and case studies</li>
            <li>Design tips and inspiration</li>
            <li>Exclusive offers and events</li>
          </ul>
          
          <p>We respect your privacy and you can unsubscribe at any time.</p>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.interiorstudioltd.com'}/projects" class="btn">Explore Our Projects</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject,
    html,
  });
}
