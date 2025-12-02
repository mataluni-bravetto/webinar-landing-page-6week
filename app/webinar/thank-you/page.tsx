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

export default function WebinarThankYouPage() {
  const [registrationId, setRegistrationId] = useState<string | null>(null)
  
  useEffect(() => {
    const storedId = sessionStorage.getItem('webinar_registration_id')
    if (storedId) {
      setRegistrationId(storedId)
    }
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
                <span><strong>Webinar details</strong> — Date, time, and join link</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span><strong>Calendar invite</strong> — Sent 24 hours before event</span>
              </li>
            </ul>
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
                <div>
                  <h4 className="text-lg font-bold text-[#102a43] mb-2">
                    Calendar Invite Coming
                  </h4>
                  <p className="text-[#334e68] text-sm mb-2">
                    We'll send you the webinar link and calendar invite 24 hours before the event.
                  </p>
                  <p className="text-sm text-gray-500">
                    (Thursday, December 4, 2025 at 2:00 PM EST)
                  </p>
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
