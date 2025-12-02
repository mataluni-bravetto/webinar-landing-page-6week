import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import { randomUUID } from 'crypto'
import { createEmailTemplate, getUrls } from './email-template'

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
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
    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM_EMAIL) {
      try {
        const urls = getUrls()
        const { subject, html, text } = createEmailTemplate(firstName, urls)
        
        await sgMail.send({
          to: email,
          from: {
            email: process.env.SENDGRID_FROM_EMAIL,
            name: process.env.SENDGRID_FROM_NAME || 'AI Validation Team'
          },
          subject,
          html,
          text
        })
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
        registrationId: registrationId,
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
