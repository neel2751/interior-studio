import { Inquiry } from '@/types/inquiry';

interface ZohoLead {
  First_Name: string;
  Last_Name: string;
  Email: string;
  Phone: string;
  Company?: string;
  Lead_Source: string;
  Description: string;
  City?: string;
  State?: string;
  Country?: string;
}

interface ZohoResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function getZohoAccessToken(): Promise<string> {
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Zoho CRM credentials not configured');
  }

  try {
    const response = await fetch('https://accounts.zoho.com/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Failed to get Zoho access token: ${data.error || 'Unknown error'}`);
    }

    return data.access_token;
  } catch (error) {
    console.error('Zoho authentication error:', error);
    throw new Error('Failed to authenticate with Zoho CRM');
  }
}

export async function createLead(inquiry: Inquiry): Promise<ZohoResponse> {
  try {
    const accessToken = await getZohoAccessToken();

    const nameParts = inquiry.fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || 'Unknown';

    const locationParts = inquiry.projectLocation.split(',').map(part => part.trim());
    const city = locationParts[0] || '';
    const state = locationParts[1] || '';
    const country = locationParts[2] || 'India';

    const leadData: ZohoLead = {
      First_Name: firstName,
      Last_Name: lastName,
      Email: inquiry.email,
      Phone: inquiry.phone,
      Company: `${inquiry.projectType.charAt(0).toUpperCase() + inquiry.projectType.slice(1)} Project`,
      Lead_Source: 'Website Contact Form',
      Description: `
Project Type: ${inquiry.projectType}
Project Location: ${inquiry.projectLocation}

Message:
${inquiry.message}

---
Submitted on: ${new Date().toISOString()}
      `.trim(),
      City: city,
      State: state,
      Country: country,
    };

    const response = await fetch(
      `https://www.zohoapis.com/crm/v2/Leads`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [leadData],
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Zoho API error:', result);
      return {
        success: false,
        error: result.message || 'Failed to create lead in Zoho CRM',
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Zoho integration error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function updateLead(leadId: string, data: Partial<ZohoLead>): Promise<ZohoResponse> {
  try {
    const accessToken = await getZohoAccessToken();

    const response = await fetch(
      `https://www.zohoapis.com/crm/v2/Leads/${leadId}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [data],
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Zoho API error:', result);
      return {
        success: false,
        error: result.message || 'Failed to update lead in Zoho CRM',
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Zoho integration error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function searchLeadByEmail(email: string): Promise<ZohoResponse> {
  try {
    const accessToken = await getZohoAccessToken();

    const response = await fetch(
      `https://www.zohoapis.com/crm/v2/Leads/search?email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Zoho API error:', result);
      return {
        success: false,
        error: result.message || 'Failed to search leads in Zoho CRM',
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Zoho integration error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function getLead(leadId: string): Promise<ZohoResponse> {
  try {
    const accessToken = await getZohoAccessToken();

    const response = await fetch(
      `https://www.zohoapis.com/crm/v2/Leads/${leadId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Zoho API error:', result);
      return {
        success: false,
        error: result.message || 'Failed to get lead from Zoho CRM',
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Zoho integration error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
