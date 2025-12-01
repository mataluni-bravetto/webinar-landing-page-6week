'use client'

import { CheckCircle, Mail, Calendar, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ThankYouPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-oxfordBlue-900 via-oxfordBlue-700 to-oxfordBlue-500 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-oxfordBlue-900">
          You&apos;re Registered! 🎉
        </h1>
        <p className="text-lg text-oxfordBlue-700 mb-8">
          Thank you for registering for our webinar. We&apos;ve sent a confirmation email with all the details.
        </p>
        
        <div className="bg-oxfordBlue-50 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-oxfordBlue-600" />
            <h2 className="text-xl font-semibold text-oxfordBlue-900">Webinar Details</h2>
          </div>
          <div className="space-y-2 text-oxfordBlue-700">
            <p><strong>Date:</strong> December 2, 2025</p>
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 text-oxfordBlue-600" />
              <p><strong>Time:</strong> 2:00 PM EST</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-oxfordBlue-700 mb-6">
          <Mail className="h-5 w-5" />
          <p>Check your email for the webinar link and calendar invite.</p>
        </div>
        
        <button
          onClick={() => router.push('/webinar')}
          className="bg-oxfordBlue-600 hover:bg-oxfordBlue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Back to Webinar Page
        </button>
      </div>
    </div>
  )
}

