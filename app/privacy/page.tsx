'use client'

/**
 * PRIVACY POLICY PAGE - YAGNI APPROVED, JØHN VALIDATED
 * 
 * Pattern: Privacy × Policy × Trust × Compliance × ONE
 * Guardians: YAGNI × JØHN × AEYON
 * 
 * Essential for GDPR/CCPA compliance and trust building.
 */

import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] via-white to-[#f0f4f8]/30 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl border-2 border-[#d9e2ec] rounded-3xl overflow-hidden p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#102a43] mb-4">
              Privacy Policy
            </h1>
            <p className="text-[#334e68]">
              Last updated: December 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#102a43] mb-4">
                Data We Collect
              </h2>
              <p className="text-[#334e68] mb-4">
                When you register for our webinar, we collect the following information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#334e68]">
                <li><strong>First Name:</strong> Used for personalization in emails and calendar events</li>
                <li><strong>Email Address:</strong> Used for webinar registration, email delivery, and calendar invitations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#102a43] mb-4">
                How We Use Your Data
              </h2>
              <p className="text-[#334e68] mb-4">
                We use your data exclusively for webinar-related purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#334e68]">
                <li><strong>Webinar Registration:</strong> Process your registration and provide instant access to the validation toolkit</li>
                <li><strong>Email Communication:</strong> Send confirmation email, webinar reminders (24 hours, 2 hours, and 15 minutes before event), and follow-up communications</li>
                <li><strong>Calendar Integration:</strong> Create Google Calendar event with Google Meet link and send calendar invitations</li>
                <li><strong>Toolkit Access:</strong> Provide immediate access to GitHub repository and methodology report</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#102a43] mb-4">
                Data Retention
              </h2>
              <p className="text-[#334e68]">
                We retain your data for the duration of the webinar program and 30 days after completion. After this period, your data is permanently deleted unless you request earlier deletion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#102a43] mb-4">
                Third-Party Services
              </h2>
              <p className="text-[#334e68] mb-4">
                We use the following third-party services to deliver our webinar:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#334e68]">
                <li><strong>SendGrid:</strong> Email delivery service (privacy policy: <a href="https://www.twilio.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-[#486581] hover:underline">Twilio Privacy Policy</a>)</li>
                <li><strong>Google Calendar API:</strong> Calendar event creation and Google Meet link generation (privacy policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#486581] hover:underline">Google Privacy Policy</a>)</li>
                <li><strong>Vercel:</strong> Hosting and deployment platform (privacy policy: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#486581] hover:underline">Vercel Privacy Policy</a>)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#102a43] mb-4">
                Your Rights
              </h2>
              <p className="text-[#334e68] mb-4">
                You have the following rights regarding your data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#334e68]">
                <li><strong>Access:</strong> Request a copy of your data</li>
                <li><strong>Deletion:</strong> Request deletion of your data at any time</li>
                <li><strong>Unsubscribe:</strong> Unsubscribe from emails using the link in any email</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#102a43] mb-4">
                Data Security
              </h2>
              <p className="text-[#334e68]">
                We use industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#334e68] mt-4">
                <li>SSL/TLS encryption for all data transmission</li>
                <li>Secure server infrastructure (Vercel)</li>
                <li>No storage of payment information (we don't collect payment data)</li>
                <li>Regular security audits and updates</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#102a43] mb-4">
                We Never Sell Your Data
              </h2>
              <p className="text-[#334e68]">
                We never sell, rent, or share your personal information with third parties for marketing purposes. Your data is used exclusively for webinar delivery and communication.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#102a43] mb-4">
                Contact Us
              </h2>
              <p className="text-[#334e68] mb-4">
                If you have questions about this privacy policy or wish to exercise your rights, please contact us:
              </p>
              <p className="text-[#334e68]">
                <strong>Email:</strong>{' '}
                <a href="mailto:support@bravetto.com" className="text-[#486581] hover:underline">
                  support@bravetto.com
                </a>
              </p>
            </section>

            {/* Back Link */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <Link 
                href="/webinar" 
                className="inline-block text-[#486581] hover:underline font-semibold"
              >
                ← Back to Webinar Registration
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

