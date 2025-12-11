'use client'

/**
 * WEBINAR THANK YOU PAGE - YAGNI APPROVED
 * 
 * Pattern: Thank You × Conversion × YAGNI × ONE
 * Guardians: YAGNI × AEYON
 * 
 * Zero component dependencies. Just works.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AddToCalendar } from '../components/AddToCalendar'

export default function WebinarThankYouPage() {
  const [registrationId, setRegistrationId] = useState<string | null>(null)
  const [googleMeetLink, setGoogleMeetLink] = useState<string | null>(null)
  const [emailStatus, setEmailStatus] = useState<{ sent: boolean; error?: string } | null>(null)
  
  useEffect(() => {
    const storedId = sessionStorage.getItem('webinar_registration_id')
    if (storedId) {
      setRegistrationId(storedId)
    }
    
    // Get email status from sessionStorage if available
    const emailStatusStr = sessionStorage.getItem('webinar_email_status')
    if (emailStatusStr) {
      try {
        setEmailStatus(JSON.parse(emailStatusStr))
      } catch (e) {
        // Ignore parse errors
      }
    }
    
    // Fetch Google Meet link
    fetch('/api/webinar/meet-link')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.meetLink) {
          setGoogleMeetLink(data.meetLink)
        }
      })
      .catch(err => {
        console.error('Failed to fetch Meet link:', err)
      })
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] via-white to-[#f0f4f8]/30 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white shadow-2xl border-2 border-[#d9e2ec] rounded-3xl overflow-hidden p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <span className="text-6xl">✓</span>
            </div>
          </div>
          
          {/* Heading */}
          <h1 className="text-4xl font-bold text-[#102a43] mb-4">
            You're All Set!
          </h1>
          
          {/* Message */}
          <p className="text-xl text-[#334e68] mb-8">
            You're successfully registered for the webinar!
          </p>
          
          {/* Email Status Warning */}
          {emailStatus && !emailStatus.sent && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-yellow-600 text-xl">⚠️</span>
                <div>
                  <p className="text-yellow-800 font-semibold mb-1">
                    Email Delivery Notice
                  </p>
                  <p className="text-yellow-700 text-sm">
                    Your registration was successful, but we couldn't send the confirmation email. 
                    Please check your spam folder or contact support if you don't receive it within 5 minutes.
                  </p>
                  {emailStatus.error && (
                    <p className="text-yellow-600 text-xs mt-2 italic">
                      Technical note: {emailStatus.error}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Email Delivery Info */}
          {emailStatus?.sent && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-blue-600 text-xl">✓</span>
                <div>
                  <p className="text-blue-800 font-semibold mb-1">
                    Email Sent Successfully
                  </p>
                  <p className="text-blue-700 text-sm">
                    Check your inbox for instant access links. If you don't see it within 5 minutes, check your spam folder.
                  </p>
                  <p className="text-blue-600 text-xs mt-2">
                    <strong>Email provider:</strong> SendGrid • <strong>Delivery time:</strong> Usually instant
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Check Email */}
          <div className="bg-gradient-to-br from-[#f0f4f8] to-[#e0e8f0]/50 border-2 border-[#bcccdc] rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-2xl font-bold text-[#486581]">→</span>
              <h2 className="text-2xl font-bold text-[#102a43]">
                Check Your Email
              </h2>
            </div>
            <p className="text-[#334e68] mb-4">
              We've sent you instant access to everything, including:
            </p>
            <ul className="text-left space-y-3 text-[#334e68]">
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span><strong>Validation Toolkit</strong> — GitHub repo link (instant access)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span><strong>Methodology Report</strong> — Complete 47-page guide (instant access)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span><strong>Webinar details</strong> — Date, time, and {googleMeetLink ? 'join link included' : 'join link coming soon'}</span>
              </li>
              {googleMeetLink && (
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span><strong>Google Meet link</strong> — <a href={googleMeetLink} target="_blank" rel="noopener noreferrer" className="text-[#486581] hover:underline font-semibold">Join now</a></span>
                </li>
              )}
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span><strong>Calendar invite</strong> — {googleMeetLink ? 'Already sent' : 'Sent 24 hours before event'}</span>
              </li>
            </ul>
          </div>

          {/* Direct Access Links - Instant Access (No Email Required) */}
          <div className="bg-gradient-to-br from-[#f0f4f8] to-[#e0e8f0]/50 border-2 border-[#bcccdc] rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-2xl font-bold text-[#486581]">⚡</span>
              <h2 className="text-2xl font-bold text-[#102a43]">
                Instant Access (No Email Required)
              </h2>
            </div>
            <p className="text-[#334e68] mb-4 text-center">
              Don't want to wait for email? Access everything right now:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="https://github.com/bravetto/ai-validation-toolkit"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-[#486581] text-[#486581] hover:bg-[#f0f4f8] transition-all py-4 px-6 rounded-lg font-semibold text-center hover:shadow-lg transform hover:scale-[1.02]"
              >
                <div className="text-2xl mb-2">📦</div>
                <div className="font-bold">GitHub Repository</div>
                <div className="text-sm text-gray-600 mt-1">12 TypeScript scripts</div>
              </a>
              <a
                href="/VALIDATION_METHODOLOGY_REPORT.md"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-[#486581] text-[#486581] hover:bg-[#f0f4f8] transition-all py-4 px-6 rounded-lg font-semibold text-center hover:shadow-lg transform hover:scale-[1.02]"
              >
                <div className="text-2xl mb-2">📄</div>
                <div className="font-bold">Methodology Report</div>
                <div className="text-sm text-gray-600 mt-1">47-page guide</div>
              </a>
            </div>
          </div>
          
          {/* Registration ID */}
          {registrationId && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8">
              <p className="text-sm text-gray-600 mb-2">Registration ID:</p>
              <code className="text-sm font-mono text-[#486581] bg-white px-4 py-2 rounded-lg border border-gray-300 block">
                {registrationId}
              </code>
            </div>
          )}
          
          {/* Next Steps */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-bold text-[#102a43] mb-6">
              What's Next?
            </h3>
            
            <div className="bg-white border-2 border-[#bcccdc] rounded-xl p-6 text-left hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#486581] to-[#334e68] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">◉</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#102a43] mb-2">
                    Access Your Toolkit Now
                  </h4>
                  <p className="text-[#334e68] text-sm mb-2">
                    Your validation toolkit and methodology report are ready right now. Check your email for instant access links.
                  </p>
                  <p className="text-sm text-gray-500">
                    (GitHub repo + 47-page methodology guide included)
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border-2 border-[#bcccdc] rounded-xl p-6 text-left hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#486581] to-[#334e68] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">→</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-[#102a43] mb-2">
                    {googleMeetLink ? 'Join the Webinar' : 'Calendar Invite Coming'}
                  </h4>
                  {googleMeetLink ? (
                    <>
                      <p className="text-[#334e68] text-sm mb-4">
                        <strong>6 Week Webinar Series | Ai Reality Check</strong><br />
                        Join the webinar on <strong>Tuesday, December 16, 2025</strong> at <strong>11:00 AM – 12:30 PM EST</strong> (90 minutes).
                      </p>
                      <div className="text-xs text-[#627d98] mb-4">
                        <p>Or dial: <a href="tel:+16505973592" className="text-[#486581] hover:underline">+1 650-597-3592</a></p>
                        <p>PIN: <span className="font-mono">697 719 929#</span></p>
                      </div>
                      <a
                        href={googleMeetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-[#486581] to-[#334e68] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all mb-4"
                      >
                        Join Google Meet →
                      </a>
                      <div className="mt-4">
                        <AddToCalendar variant="button" />
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-[#334e68] text-sm mb-2">
                        We'll send you the webinar link and calendar invite 24 hours before the event.
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        (Thursday, December 4, 2025 at 2:00 PM EST)
                      </p>
                      <div className="mt-4">
                        <AddToCalendar variant="button" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="bg-white border-2 border-[#bcccdc] rounded-xl p-6 text-left hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#486581] to-[#334e68] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">●</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#102a43] mb-2">
                    Watch for Reminders
                  </h4>
                  <p className="text-[#334e68] text-sm mb-2">
                    We'll send reminder emails 24 hours, 3 hours, and 15 minutes before the webinar.
                  </p>
                  <p className="text-sm text-gray-500">
                    (Check spam folder if you don't see them)
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link href="/webinar" className="block">
              <button className="w-full bg-gradient-to-r from-[#486581] to-[#334e68] text-white hover:shadow-xl transform hover:scale-[1.02] transition-all shadow-lg py-4 px-6 rounded-lg font-bold text-lg">
                Return to Webinar Page →
              </button>
            </Link>
            
            <Link href="/" className="block">
              <button className="w-full bg-white border-2 border-[#9fb3c8] text-[#486581] hover:bg-[#f0f4f8] transition-all py-4 px-6 rounded-lg font-bold text-lg">
                Return to Home →
              </button>
            </Link>
          </div>
          
          {/* Help - Support */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Questions?{' '}
              <a href="mailto:support@bravetto.com" className="text-[#486581] hover:underline font-semibold">
                Contact Support
              </a>
            </p>
            <p className="text-xs text-gray-500 italic">
              We respond to all emails within 24 hours. This is a beta program - your feedback matters.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
