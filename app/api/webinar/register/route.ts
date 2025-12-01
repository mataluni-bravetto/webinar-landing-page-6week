import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, email, icp } = body

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

    // Send confirmation email if SendGrid is configured
    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM_EMAIL) {
      try {
        const msg = {
          to: email,
          from: {
            email: process.env.SENDGRID_FROM_EMAIL,
            name: process.env.SENDGRID_FROM_NAME || 'AiGuardian Team'
          },
          subject: 'You\'re Registered for the Webinar! 🎉',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #102a43;">Welcome, ${firstName}!</h1>
              <p>You're successfully registered for our webinar.</p>
              <h2>Webinar Details:</h2>
              <ul>
                <li><strong>Date:</strong> December 2, 2025</li>
                <li><strong>Time:</strong> 2:00 PM EST</li>
              </ul>
              <p>We'll send you a reminder and the webinar link closer to the event.</p>
              <p>Looking forward to seeing you there!</p>
              <p>Best regards,<br>The AiGuardian Team</p>
            </div>
          `
        }

        await sgMail.send(msg)
      } catch (emailError) {
        console.error('Error sending email:', emailError)
        // Don't fail the registration if email fails
      }
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful',
        data: {
          firstName,
          email,
          icp: icp || 'general',
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
