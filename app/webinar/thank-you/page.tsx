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
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-[#102a43]">
              You're All Set!
            </h1>
            <span className="text-4xl">✨</span>
          </div>
          
          {/* Message */}
          <p className="text-xl text-[#334e68] mb-8">
            You're successfully registered for the webinar!
          </p>
          
          {/* Check Email */}
          <div className="bg-gradient-to-br from-[#f0f4f8] to-[#e0e8f0]/50 border-2 border-[#bcccdc] rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-2xl">📧</span>
              <h2 className="text-2xl font-bold text-[#102a43]">
                Check Your Email
              </h2>
            </div>
            <p className="text-[#334e68] mb-4">
              We've sent you a confirmation email with all the details, including:
            </p>
            <ul className="text-left space-y-3 text-[#334e68]">
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span>Webinar date, time, and join link</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span>Calendar invite (add to your calendar)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span>Reminder schedule (24h, 3h, 15min before)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span>Your free bonus resources ($597 value)</span>
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
                <span className="text-[#486581] text-3xl">📅</span>
                <div>
                  <h4 className="text-lg font-bold text-[#102a43] mb-2">
                    Add to Your Calendar
                  </h4>
                  <p className="text-[#334e68] text-sm mb-2">
                    Don't miss it! Add the webinar to your calendar so you get reminders.
                  </p>
                  <p className="text-sm text-gray-500">
                    (Check your email for the calendar link)
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border-2 border-yellow-200 rounded-xl p-6 text-left hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <span className="text-yellow-500 text-3xl">🎁</span>
                <div>
                  <h4 className="text-lg font-bold text-[#102a43] mb-2">
                    Get Your Free Bonuses
                  </h4>
                  <p className="text-[#334e68] text-sm mb-2">
                    All bonus resources will be sent to your email after the webinar.
                  </p>
                  <p className="text-sm text-gray-500">
                    (Code examples, templates, benchmarks, and more!)
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border-2 border-green-200 rounded-xl p-6 text-left hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <span className="text-green-500 text-3xl">📧</span>
                <div>
                  <h4 className="text-lg font-bold text-[#102a43] mb-2">
                    Watch for Reminders
                  </h4>
                  <p className="text-[#334e68] text-sm mb-2">
                    We'll send you reminder emails 24 hours, 3 hours, and 15 minutes before the webinar.
                  </p>
                  <p className="text-sm text-gray-500">
                    (Make sure to check your spam folder if you don't see them)
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
