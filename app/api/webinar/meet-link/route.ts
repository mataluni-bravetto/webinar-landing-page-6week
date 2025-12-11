import { NextResponse } from 'next/server'

/**
 * Google Meet Link API Route
 * Returns the Google Meet link for the webinar
 */

const GOOGLE_MEET_LINK = 'https://meet.google.com/mgm-wojn-kes'
const GOOGLE_MEET_PHONE = '+1 650-597-3592'
const GOOGLE_MEET_PIN = '697 719 929'

export async function GET() {
  return NextResponse.json({
    success: true,
    meetLink: GOOGLE_MEET_LINK,
    phone: GOOGLE_MEET_PHONE,
    pin: GOOGLE_MEET_PIN,
    date: 'Tuesday, December 16, 2025',
    time: '11:00 AM – 12:30 PM EST',
    duration: '90 minutes',
    title: '6 Week Webinar Series | Ai Reality Check'
  })
}
