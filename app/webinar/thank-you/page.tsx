'use client'

/**
 * WEBINAR THANK YOU PAGE
 * 
 * Shown after successful webinar registration
 * 
 * Pattern: Thank You × Conversion × Webinar × ONE
 * Guardians: AEYON (999 Hz) × Lux (530 Hz)
 */

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Mail, Calendar, Gift, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'

export default function WebinarThankYouPage() {
  const searchParams = useSearchParams()
  const [registrationId, setRegistrationId] = useState<string | null>(null)
  
  useEffect(() => {
    // Get registration ID from sessionStorage if available
    const storedId = sessionStorage.getItem('webinar_registration_id')
    if (storedId) {
      setRegistrationId(storedId)
    }
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-oxfordBlue-50 via-white to-oxfordBlue-50/30 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <Card className="bg-white shadow-2xl border-2 border-oxfordBlue-100 rounded-3xl overflow-hidden">
          <CardContent className="p-8 md:p-12 text-center">
            {/* Success Icon */}
            <div className="mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            
            {/* Heading */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <Text as="h1" size="4xl" weight="bold" className="text-oxfordBlue-900">
                You&apos;re All Set!
              </Text>
              <Sparkles className="h-8 w-8 text-yellow-500" />
            </div>
            
            {/* Message */}
            <Text size="xl" className="text-oxfordBlue-700 mb-8">
              You&apos;re successfully registered for the webinar!
            </Text>
            
            {/* Check Email */}
            <Card className="bg-gradient-to-br from-oxfordBlue-50 to-oxfordBlue-100/50 border-2 border-oxfordBlue-200 rounded-2xl p-6 mb-8">
              <CardContent>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Mail className="h-6 w-6 text-oxfordBlue-600" />
                  <Text as="h2" size="2xl" weight="bold" className="text-oxfordBlue-900">
                    Check Your Email
                  </Text>
                </div>
                <Text className="text-oxfordBlue-700 mb-4">
                  We&apos;ve sent you a confirmation email with all the details, including:
                </Text>
                <ul className="text-left space-y-3 text-oxfordBlue-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Webinar date, time, and join link</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Calendar invite (add to your calendar)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Reminder schedule (24h, 3h, 15min before)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Your free bonus resources ($597-$896 value)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Registration ID */}
            {registrationId && (
              <Card className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8">
                <CardContent>
                  <Text size="sm" className="text-gray-600 mb-2">Registration ID:</Text>
                  <code className="text-sm font-mono text-oxfordBlue-600 bg-white px-4 py-2 rounded-lg border border-gray-300 block">
                    {registrationId}
                  </code>
                </CardContent>
              </Card>
            )}
            
            {/* Next Steps */}
            <div className="space-y-4 mb-8">
              <Text as="h3" size="xl" weight="bold" className="text-oxfordBlue-900 mb-6">
                What&apos;s Next?
              </Text>
              
              <Card className="bg-white border-2 border-oxfordBlue-200 rounded-xl p-6 text-left hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="text-oxfordBlue-600 flex-shrink-0">
                      <Calendar className="h-8 w-8" />
                    </div>
                    <div>
                      <Text as="h4" size="lg" weight="bold" className="text-oxfordBlue-900 mb-2">
                        Add to Your Calendar
                      </Text>
                      <Text className="text-oxfordBlue-700 text-sm mb-2">
                        Don&apos;t miss it! Add the webinar to your calendar so you get reminders.
                      </Text>
                      <Text size="sm" className="text-gray-500">
                        (Check your email for the calendar link)
                      </Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-2 border-yellow-200 rounded-xl p-6 text-left hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="text-yellow-500 flex-shrink-0">
                      <Gift className="h-8 w-8" />
                    </div>
                    <div>
                      <Text as="h4" size="lg" weight="bold" className="text-oxfordBlue-900 mb-2">
                        Get Your Free Bonuses
                      </Text>
                      <Text className="text-oxfordBlue-700 text-sm mb-2">
                        All bonus resources will be sent to your email after the webinar.
                      </Text>
                      <Text size="sm" className="text-gray-500">
                        (Code examples, templates, benchmarks, and more!)
                      </Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-2 border-green-200 rounded-xl p-6 text-left hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="text-green-500 flex-shrink-0">
                      <Mail className="h-8 w-8" />
                    </div>
                    <div>
                      <Text as="h4" size="lg" weight="bold" className="text-oxfordBlue-900 mb-2">
                        Watch for Reminders
                      </Text>
                      <Text className="text-oxfordBlue-700 text-sm mb-2">
                        We&apos;ll send you reminder emails 24 hours, 3 hours, and 15 minutes before the webinar.
                      </Text>
                      <Text size="sm" className="text-gray-500">
                        (Make sure to check your spam folder if you don&apos;t see them)
                      </Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* CTA Buttons */}
            <div className="space-y-3">
              <Link href="/webinar" className="block">
                <Button
                  variant="creative"
                  size="lg"
                  className="w-full bg-gradient-to-r from-oxfordBlue-600 to-oxfordBlue-500 text-white hover:from-oxfordBlue-500 hover:to-oxfordBlue-600 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
                >
                  Return to Webinar Page →
                </Button>
              </Link>
              
              <Link href="/" className="block">
                <Button
                  variant="developer"
                  size="lg"
                  className="w-full bg-white border-2 border-oxfordBlue-300 text-oxfordBlue-600 hover:bg-oxfordBlue-50 transition-all"
                >
                  Return to Home →
                </Button>
              </Link>
            </div>
            
            {/* Help - Support */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <Text size="sm" className="text-gray-600 mb-2">
                Questions?{' '}
                <a href="mailto:support@bravetto.com" className="text-oxfordBlue-600 hover:underline font-semibold">
                  Contact Support
                </a>
              </Text>
              <Text size="xs" className="text-gray-500 italic">
                We respond to all emails within 24 hours. This is a beta program - your feedback matters.
              </Text>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

