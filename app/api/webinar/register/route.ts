import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import { randomUUID } from 'crypto'
import { getSendGridCredentials } from '@/lib/abekeys-reader'

// Email template functions (YAGNI: inline for simplicity)
function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || 
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://webinar-landing-page-backup.vercel.app')
}

function getUrls() {
  const baseUrl = getBaseUrl()
  return {
    githubRepo: process.env.GITHUB_REPO_URL || 'https://github.com/bravetto/ai-validation-toolkit',
    methodologyReport: `${baseUrl}/VALIDATION_METHODOLOGY_REPORT.md`,
    landingPage: `${baseUrl}/webinar`
  }
}

function createEmailTemplate(firstName: string, urls: ReturnType<typeof getUrls>) {
  const sendGridCreds = getSendGridCredentials()
  const teamName = sendGridCreds.fromName
  return {
    subject: 'Your Validation Toolkit is Ready (Instant Access)',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #334e68; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f0f4f8;">
  <div style="background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h1 style="color: #102a43; margin-top: 0; font-size: 28px;">Welcome, ${firstName}!</h1>
    <p style="font-size: 16px; color: #334e68;">You're registered for the webinar, and your <strong>Validation Toolkit is ready right now</strong>—no waiting required.</p>
    <div style="background: #f0f4f8; border-left: 4px solid #486581; padding: 20px; margin: 25px 0; border-radius: 4px;">
      <h2 style="color: #102a43; margin-top: 0; font-size: 20px;">Your Instant Access Deliverables:</h2>
      <div style="margin: 20px 0;">
        <h3 style="color: #486581; font-size: 18px; margin-bottom: 8px;">→ Complete Validation Toolkit</h3>
        <p style="margin: 8px 0; color: #334e68;">5 validation scripts, configuration files, and documentation. MIT licensed, production-ready.</p>
        <a href="${urls.githubRepo}" style="display: inline-block; background: #486581; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 8px;">Access GitHub Repository →</a>
      </div>
      <div style="margin: 20px 0;">
        <h3 style="color: #486581; font-size: 18px; margin-bottom: 8px;">→ Methodology Report</h3>
        <p style="margin: 8px 0; color: #334e68;">Complete 3-Step Validation Pipeline documentation. Test results, real-world examples, CI/CD integration guide.</p>
        <a href="${urls.methodologyReport}" style="display: inline-block; background: #486581; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 8px;">Read Methodology Report →</a>
      </div>
      <div style="margin: 20px 0;">
        <h3 style="color: #486581; font-size: 18px; margin-bottom: 8px;">→ Webinar Details</h3>
        <p style="margin: 8px 0; color: #334e68;"><strong>Title:</strong> 6 Week Webinar Series | Ai Reality Check<br><strong>Date:</strong> Tuesday, December 16, 2025<br><strong>Time:</strong> 11:00 AM – 12:30 PM EST<br><strong>Duration:</strong> 90 minutes</p>
        <p style="margin: 12px 0 8px 0; color: #334e68;"><strong>Join the Webinar:</strong></p>
        <p style="margin: 8px 0; color: #334e68;">
          <strong>Video call link:</strong> <a href="https://meet.google.com/mgm-wojn-kes" style="color: #486581; text-decoration: underline;">https://meet.google.com/mgm-wojn-kes</a><br>
          <strong>Or dial:</strong> (US) +1 650-597-3592<br>
          <strong>PIN:</strong> 697 719 929#
        </p>
        <p style="margin: 12px 0 0 0; color: #334e68;">Calendar invite with Google Meet link has been sent to your email.</p>
      </div>
    </div>
    <div style="border-top: 1px solid #d9e2ec; padding-top: 20px; margin-top: 30px;">
      <h3 style="color: #102a43; font-size: 18px;">What's Next?</h3>
      <ol style="color: #334e68; padding-left: 20px;">
        <li style="margin: 8px 0;">Clone the repository and explore the validation scripts</li>
        <li style="margin: 8px 0;">Read the methodology report to understand the approach</li>
        <li style="margin: 8px 0;">Join the webinar to see it in action and ask questions</li>
      </ol>
    </div>
    <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #d9e2ec; color: #627d98; font-size: 14px;">
      <strong>Why immediate access?</strong> We want you to experience the validation system before the webinar. Use it, test it, come prepared with questions. Zero risk, maximum value.
    </p>
    <p style="margin-top: 25px; color: #334e68;">Best regards,<br><strong style="color: #102a43;">${teamName}</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #9fb3c8; font-size: 12px;">
    <p>You're receiving this because you registered for the 6 Week Webinar Series | Ai Reality Check.</p>
    <p><a href="${urls.landingPage}" style="color: #486581;">View Landing Page</a> | <a href="#" style="color: #486581;">Unsubscribe</a></p>
  </div>
</body>
</html>
    `.trim(),
    text: `Welcome, ${firstName}!\n\nYou're registered for the webinar, and your Validation Toolkit is ready right now—no waiting required.\n\nYOUR INSTANT ACCESS DELIVERABLES:\n\n→ Complete Validation Toolkit\n5 validation scripts, configuration files, and documentation. MIT licensed, production-ready.\nAccess: ${urls.githubRepo}\n\n→ Methodology Report\nComplete 3-Step Validation Pipeline documentation. Test results, real-world examples, CI/CD integration guide.\nAccess: ${urls.methodologyReport}\n\n→ Webinar Details\nTitle: 6 Week Webinar Series | Ai Reality Check\nDate: Tuesday, December 16, 2025\nTime: 11:00 AM – 12:30 PM EST\nDuration: 90 minutes\n\nJoin the Webinar:\nVideo call link: https://meet.google.com/mgm-wojn-kes\nOr dial: (US) +1 650-597-3592\nPIN: 697 719 929#\n\nCalendar invite with Google Meet link has been sent to your email.\n\nWHAT'S NEXT?\n1. Clone the repository and explore the validation scripts\n2. Read the methodology report to understand the approach\n3. Join the webinar to see it in action and ask questions\n\nWhy immediate access? We want you to experience the validation system before the webinar. Use it, test it, come prepared with questions. Zero risk, maximum value.\n\nBest regards,\n${teamName}`.trim()
  }
}

// Initialize SendGrid from AbëKEYS or environment variables
const sendGridCreds = getSendGridCredentials()
if (sendGridCreds.apiKey) {
  sgMail.setApiKey(sendGridCreds.apiKey)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, email } = body

    // Validate input
    if (!firstName || !email) {
      return NextResponse.json(
        { error: 'First name and email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Generate registration ID
    const registrationId = randomUUID()

    // TODO: Store registration in database/storage (optional - for production)
    // Example with Vercel KV:
    // const kv = new VercelKV({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN })
    // await kv.set(`webinar:registration:${registrationId}`, JSON.stringify({ firstName, email, registeredAt: new Date().toISOString() }))
    // await kv.incr('webinar:registrations:count')

    // Send confirmation email with immediate deliverables if SendGrid is configured
    let emailSent = false
    let emailError: string | null = null
    
    const sendGridCreds = getSendGridCredentials()
    
    if (sendGridCreds.apiKey && sendGridCreds.fromEmail) {
      try {
        const urls = getUrls()
        const { subject, html, text } = createEmailTemplate(firstName, urls)
        
        await sgMail.send({
          to: email,
          from: {
            email: sendGridCreds.fromEmail,
            name: sendGridCreds.fromName
          },
          subject,
          html,
          text
        })
        emailSent = true
      } catch (error: any) {
        emailError = error?.response?.body?.errors?.[0]?.message || error?.message || 'Unknown error'
        console.error('SendGrid Error:', {
          message: error?.message,
          response: error?.response?.body,
          code: error?.code,
          statusCode: error?.response?.statusCode
        })
        // Don't fail the registration if email fails
      }
    } else {
      emailError = 'SendGrid not configured (missing API key or from email in AbëKEYS vault or environment variables)'
      console.warn('SendGrid not configured:', {
        hasApiKey: !!sendGridCreds.apiKey,
        hasFromEmail: !!sendGridCreds.fromEmail,
        abekeysPath: `${require('os').homedir()}/.abekeys/credentials/sendgrid.json`
      })
    }

    // Return success response with email status
    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful',
        registrationId: registrationId,
        emailSent,
        emailError: emailError || undefined,
        data: {
          firstName,
          email,
          registeredAt: new Date().toISOString()
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
