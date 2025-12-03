'use client'

/**
 * WEBINAR LANDING PAGE - YAGNI APPROVED, PRAGMATICALLY PERFECT
 * 
 * Pattern: Webinar × Conversion × YAGNI × ONE
 * Guardians: YAGNI × JØHN × AEYON
 * 
 * This is THE landing page. It just works.
 * All content inline. Zero component dependencies. Maximum conversion.
 */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AGENDA_ITEMS, LEAD_MAGNETS, FAQ_ITEMS, FORM_REASSURANCE } from './content'
import { formatMetrics } from './metrics'
import { AddToCalendar } from './components/AddToCalendar'

// Webinar date/time: Thursday, December 4, 2025 at 2:00 PM EST (7:00 PM UTC)
const WEBINAR_DATE = new Date('2025-12-04T19:00:00Z') // UTC time

export default function WebinarLandingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ firstName: '', email: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false })
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [googleMeetLink, setGoogleMeetLink] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<{ firstName?: string; email?: string; submit?: string }>({})

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Show scroll-to-top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const diff = WEBINAR_DATE.getTime() - now.getTime()
      
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true })
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds, isPast: false })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  // Fetch Google Meet link on mount
  useEffect(() => {
    fetch('/api/webinar/meet-link')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.meetLink) {
          setGoogleMeetLink(data.meetLink)
        }
      })
      .catch(err => {
        console.error('Failed to fetch Meet link:', err)
        // Silent fail - Meet link is optional
      })
  }, [])

  const validateForm = (): boolean => {
    const errors: typeof formErrors = {}
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required'
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormErrors({})
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/webinar/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          email: formData.email
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.registrationId) {
          sessionStorage.setItem('webinar_registration_id', data.registrationId)
        }
        
        // Store email status for thank-you page
        sessionStorage.setItem('webinar_email_status', JSON.stringify({
          sent: data.emailSent === true,
          error: data.emailError || undefined
        }))
        
        router.push('/webinar/thank-you')
      } else {
        const error = await response.json()
        setFormErrors({ submit: error.error || 'Registration failed. Please try again.' })
      }
    } catch (error) {
      setFormErrors({ submit: 'Registration failed. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#102a43] via-[#334e68] to-[#486581] text-white py-20 md:py-32 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#102a43]/50 via-transparent to-[#486581]/30"></div>
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#829ab1]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#9fb3c8]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Headline */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-2xl" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              The 3-Step Validation Pipeline That Catches AI Code Failures Before Production
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            </div>
            <p className="text-xl md:text-2xl mb-6 text-white/95 max-w-4xl mx-auto leading-relaxed" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
              Stop debugging AI-generated code blind. See the exact validation framework we use internally—a context-aware system that catches the subtle bugs that look correct but break under real-world load. Works WITH your judgment, not against it.
            </p>
            <p className="text-lg mb-4 text-white/90 max-w-3xl mx-auto">
              Free 60-minute technical session. <strong>Toolkit delivered instantly upon registration. Start validating your code today.</strong> MIT-licensed, open source. Ship knowing it works—not hoping it does.
            </p>
            <p className="text-base md:text-lg mb-8 text-white/95 max-w-3xl mx-auto font-medium">
              Save 40+ hours of debugging per month. Catch failures in 12-29ms instead of hours. See exactly how.
            </p>
            
            {/* Countdown Timer */}
            {!timeLeft.isPast && (
              <div className="max-w-2xl mx-auto mb-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                  <div className="text-center mb-4">
                    <p className="text-white/90 text-sm mb-2">Webinar starts in:</p>
                    <div className="flex items-center justify-center gap-4 md:gap-6">
                      <div className="flex flex-col items-center">
                        <div className="text-3xl md:text-4xl font-bold text-white">{timeLeft.days}</div>
                        <div className="text-xs text-white/80 uppercase">Days</div>
                      </div>
                      <div className="text-2xl text-white/60">:</div>
                      <div className="flex flex-col items-center">
                        <div className="text-3xl md:text-4xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
                        <div className="text-xs text-white/80 uppercase">Hours</div>
                      </div>
                      <div className="text-2xl text-white/60">:</div>
                      <div className="flex flex-col items-center">
                        <div className="text-3xl md:text-4xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
                        <div className="text-xs text-white/80 uppercase">Minutes</div>
                      </div>
                      <div className="text-2xl text-white/60">:</div>
                      <div className="flex flex-col items-center">
                        <div className="text-3xl md:text-4xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
                        <div className="text-xs text-white/80 uppercase">Seconds</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center pt-4 border-t border-white/20">
                    <p className="text-white/90 text-xs mb-4">
                      <strong className="text-white">Thursday, December 4, 2025</strong><br />
                      11:00 AM PST / 2:00 PM EST
                    </p>
                    {googleMeetLink && (
                      <a
                        href={googleMeetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white text-[#486581] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 mb-4"
                      >
                        Join Google Meet →
                      </a>
                    )}
                    {/* Add to Calendar */}
                    <div className="mt-4">
                      <AddToCalendar variant="button" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Why Free Transparency */}
          <div className="max-w-2xl mx-auto mb-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center">
            <p className="text-white/95 text-sm leading-relaxed">
              <strong className="text-white">Why free?</strong> We want you to experience the validation system before asking for anything. Zero risk for you. The methodology is open source—see exactly how it works, use it yourself, improve it if you can.
            </p>
          </div>

          {/* Registration Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/15 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl overflow-hidden relative p-8 md:p-10">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-white/90 mb-2">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      required
                      autoCapitalize="off"
                      autoCorrect="off"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={(e) => {
                        setFormData({ ...formData, firstName: e.target.value })
                        if (formErrors.firstName) {
                          setFormErrors({ ...formErrors, firstName: undefined })
                        }
                      }}
                      className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                        formErrors.firstName ? 'border-red-400' : 'border-white/20'
                      } text-white placeholder-white/70 focus:outline-none focus:border-white transition-all`}
                    />
                    {formErrors.firstName && (
                      <p className="text-red-400 text-sm mt-1">{formErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      autoCapitalize="off"
                      autoCorrect="off"
                      autoComplete="email"
                      inputMode="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value })
                        if (formErrors.email) {
                          setFormErrors({ ...formErrors, email: undefined })
                        }
                      }}
                      className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                        formErrors.email ? 'border-red-400' : 'border-white/20'
                      } text-white placeholder-white/70 focus:outline-none focus:border-white transition-all`}
                    />
                    {formErrors.email && (
                      <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>
                {formErrors.submit && (
                  <div className="mb-4 p-3 bg-red-500/20 border border-red-400 rounded-lg">
                    <p className="text-red-200 text-sm">{formErrors.submit}</p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#486581] via-[#627d98] to-[#486581] hover:from-[#627d98] hover:via-[#486581] hover:to-[#334e68] text-white shadow-2xl hover:shadow-[#486581]/50 transform hover:scale-[1.02] transition-all duration-300 font-bold text-lg py-6 md:py-6 min-h-[52px] rounded-xl border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed relative"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send My Toolkit Now"
                  )}
                </button>
                {/* Form Micro-Reassurance */}
                <p className="text-sm text-white/70 mt-2 text-center">
                  ✓ Instant toolkit access · ✓ No credit card · ✓ MIT licensed
                </p>
                {/* Privacy Policy & Data Usage */}
                <div className="mt-4 text-xs text-white/70 text-center space-y-2">
                  <p>
                    By registering, you agree to our{' '}
                    <a 
                      href="/privacy" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-white"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                  <div className="text-white/60">
                    <p className="mb-1">
                      <strong>How we use your data:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 text-[10px]">
                      <li>Send webinar confirmation email</li>
                      <li>Create calendar event with Google Meet link</li>
                      <li>Send webinar reminders</li>
                      <li>Provide instant access to validation toolkit</li>
                    </ul>
                    <p className="mt-1">
                      We never sell your data. Unsubscribe anytime.
                    </p>
                  </div>
                  {/* Security Indicators */}
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-white/60">
                    <span>🔒</span>
                    <span>Secure registration • SSL encrypted • GDPR compliant</span>
                  </div>
                </div>
                {/* Sub-CTA Reassurance */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 md:gap-3 text-xs md:text-sm text-white/90 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="text-green-400 font-bold">✓</span> {formatMetrics.scripts()} TypeScript scripts
                  </span>
                  <span className="text-white/40 hidden sm:inline">•</span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-green-400 font-bold">✓</span> {formatMetrics.guidePages()}-page guide
                  </span>
                  <span className="text-white/40 hidden sm:inline">•</span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-green-400 font-bold">✓</span> Instant access
                  </span>
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
                  <span className="flex items-center gap-2">
                    <span className="text-xs font-semibold">→</span> Instant toolkit access
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs font-semibold">✓</span> No credit card required
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs font-semibold">◉</span> {googleMeetLink ? 'Join link available' : 'Calendar invite (24h before)'}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs font-semibold">@</span> Unsubscribe anytime
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLKIT PREVIEW SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#102a43]">
            What's Inside the Toolkit
          </h3>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-[#d9e2ec]">
            <div className="p-4 border-b bg-gray-100">
              <span className="text-sm font-medium text-gray-700">
                💻 Script Preview: phantom-detector.ts
              </span>
            </div>
            <div className="p-6">
              <pre className="font-mono text-sm bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                <code>{`// phantom-detector.ts
export const detectPhantomAPI = async (
  code: string
): Promise<PhantomResult[]> => {
  const imports = extractImports(code);
  const phantoms = imports.filter(
    i => !existsInRegistry(i)
  );
  return phantoms.map(formatResult);
};`}</code>
              </pre>
              <p className="mt-4 text-sm text-gray-600">
                <strong>12 TypeScript scripts</strong> included. Copy-paste ready. Fully commented and tested. Includes phantom API detection, security scanning, and type inference.
              </p>
              <p className="mt-2 text-xs text-gray-500">
                All scripts are MIT licensed and copy-paste ready
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white via-[#f0f4f8]/30 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#102a43]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Technical Agenda: What We'll Cover in 60 Minutes
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#9fb3c8] to-transparent"></div>
              <div className="w-2 h-2 bg-[#486581] rounded-full"></div>
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#9fb3c8] to-transparent"></div>
            </div>
            <p className="text-xl text-[#334e68] max-w-3xl mx-auto leading-relaxed">
              See the exact validation framework we use internally, including live demos and real code examples
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {AGENDA_ITEMS.map((feature, idx) => (
              <div key={idx} className="bg-white border-2 border-[#d9e2ec] rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:border-[#9fb3c8] transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#486581] to-[#334e68] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-2xl font-bold text-white">{feature.symbol}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-[#486581] mb-2">{feature.time}</div>
                    <h3 className="text-xl font-bold mb-3 text-[#102a43]">
                      {feature.title}
                    </h3>
                  </div>
                </div>
                <p className="text-[#334e68] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATIONAL VALIDATION APPROACH */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white via-[#f0f4f8]/30 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#102a43]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Validation That Works With You, Not Against You
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#9fb3c8] to-transparent"></div>
              <div className="w-2 h-2 bg-[#486581] rounded-full"></div>
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#9fb3c8] to-transparent"></div>
            </div>
            <p className="text-xl text-[#334e68] max-w-3xl mx-auto leading-relaxed mb-8">
              Most validation tools treat your code as isolated snippets. This framework understands context, learns from your feedback, and respects your judgment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <div className="bg-white border-2 border-[#d9e2ec] rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-[#102a43]">Traditional Validation Tools</h3>
              <ul className="space-y-3 text-[#334e68]">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">×</span>
                  <span>Generic rules, no context awareness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">×</span>
                  <span>Auto-fixes without understanding intent</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">×</span>
                  <span>No learning from your corrections</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">×</span>
                  <span>Ignores codebase relationships</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">×</span>
                  <span>High false positive rate</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-[#f0f4f8] to-white border-2 border-[#486581] rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-[#102a43]">This Validation Framework</h3>
              <ul className="space-y-3 text-[#334e68]">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">→</span>
                  <span>Context-aware: understands your codebase structure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">→</span>
                  <span>Respects judgment: flags issues, you decide</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">→</span>
                  <span>Learns from feedback: improves false positive handling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">→</span>
                  <span>Maintains relationships: tracks dependencies across files</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">→</span>
                  <span>&lt;3% false positive rate (documented)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-white border-2 border-[#d9e2ec] rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold mb-6 text-[#102a43]">How It Works: Partnership Model</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2 text-[#486581]">Context-Aware Detection</h4>
                <p className="text-[#334e68] leading-relaxed">
                  The framework analyzes your entire codebase structure, not just isolated files. It understands how modules relate, tracks dependencies, and identifies issues that only appear in context.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-[#486581]">Learning from Your Feedback</h4>
                <p className="text-[#334e68] leading-relaxed">
                  When you mark something as a false positive or correct a detection, the framework learns. You can document exceptions, improve patterns, and the system gets better at understanding YOUR codebase.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-[#486581]">Respecting Your Judgment</h4>
                <p className="text-[#334e68] leading-relaxed">
                  The framework flags potential issues—you decide what to fix. No auto-fixes that break your code. No assumptions about your intent. Just clear, actionable information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white via-[#f0f4f8]/20 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#102a43]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              New Technical Session
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#9fb3c8] to-transparent"></div>
              <div className="w-2 h-2 bg-[#486581] rounded-full"></div>
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#9fb3c8] to-transparent"></div>
            </div>
            <p className="text-xl text-[#334e68] max-w-3xl mx-auto leading-relaxed mb-8">
              This is a new deep-dive format. Be among the first engineers to experience it and help us improve. Your feedback shapes the methodology.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#f0f4f8] via-white to-[#f0f4f8]/50 border-2 border-[#bcccdc] rounded-3xl p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#bcccdc]/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#9fb3c8]/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-2xl font-bold mb-6 text-[#102a43]">
                The Methodology is Open Source
              </h3>
              <p className="text-[#334e68] leading-relaxed mb-6">
                You can audit every check, see the test corpus, and verify our accuracy claims yourself. We're not asking for trust—we're showing our work.
              </p>
              <div className="mb-6">
                <a 
                  href="https://github.com/bravetto/ai-validation-toolkit" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-[#486581] to-[#334e68] hover:from-[#334e68] hover:to-[#486581] text-white px-6 py-3 md:py-3 min-h-[44px] rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  View Repository on GitHub →
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-[#334e68]">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#486581]">✓</span>
                  <span className="text-sm font-medium">MIT Licensed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#486581]">→</span>
                  <span className="text-sm font-medium">Fully Transparent</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#486581]">●</span>
                  <span className="text-sm font-medium">Production Tested</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD MAGNETS */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white via-[#f0f4f8]/30 to-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#102a43]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              The Validation Toolkit (MIT Licensed)
            </h2>
            <p className="text-lg text-[#334e68] max-w-2xl mx-auto mb-6">
              What you'll get immediately after registration:
            </p>
          </div>

          <div className="bg-white border-2 border-[#d9e2ec] rounded-2xl p-8 shadow-lg mb-8">
            <h3 className="text-xl font-bold mb-6 text-[#102a43]">What's in the repo:</h3>
            <div className="space-y-4 font-mono text-sm text-[#334e68]">
              <div className="pl-4">
                <div className="font-semibold text-[#102a43] mb-2">/validation-scripts/</div>
                <div className="pl-4 space-y-1">
                  <div>├── phantom-detector.ts — catches hallucinated APIs</div>
                  <div>├── security-scanner.ts — OWASP pattern matching</div>
                  <div>├── test-generator.ts — automated test scaffolding</div>
                  <div>├── type-inferencer.ts — adds types to untyped AI code</div>
                  <div>└── perf-profiler.ts — identifies performance issues</div>
                </div>
              </div>
              <div className="pl-4">
                <div className="font-semibold text-[#102a43] mb-2">/configs/</div>
                <div className="pl-4 space-y-1">
                  <div>├── eslint-ai-rules.json — custom lint rules for AI code</div>
                  <div>├── github-action.yml — ready-to-use CI workflow</div>
                  <div>└── patterns.json — known anti-pattern definitions</div>
                </div>
              </div>
              <div className="pl-4">
                <div className="font-semibold text-[#102a43] mb-2">/docs/</div>
                <div className="pl-4 space-y-1">
                  <div>├── methodology.md — how and why each check works</div>
                  <div>├── false-positives.md — handling edge cases</div>
                  <div>├── contributing.md — how to add new patterns</div>
                  <div>└── benchmarks.md — accuracy across test corpus</div>
                </div>
              </div>
              <div className="pl-4 pt-2">
                <div className="font-semibold text-[#102a43]">README.md — quick start in 5 minutes</div>
              </div>
            </div>
            <p className="mt-6 text-[#334e68] italic">
              Star it, fork it, improve it. No license restrictions.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { symbol: '→', title: '12 TypeScript Validation Functions', desc: 'Copy-paste ready implementations. Fully commented and tested. Includes phantom API detection, security scanning, and type inference. Delivered instantly upon registration.' },
              { symbol: '>', title: 'GitHub Actions Workflow', desc: 'Ready-to-use CI/CD integration. Pre-commit hooks included. Works with React, Vue, Next.js, FastAPI, Express. Access immediately after opt-in.' },
              { symbol: '●', title: 'Accuracy Report', desc: `Test results across ${formatMetrics.validated()} AI-generated functions. Shows what we caught, what we missed, and why. Includes edge case documentation. Available right now.` },
              { symbol: '→', title: '47-Page Methodology Guide', desc: 'Complete technical documentation explaining how each validation step works, why it matters, and how to extend it. Instant access via email.' },
              { symbol: '✓', title: '15-Step Integration Checklist', desc: 'Actionable checklist for adding validation to your existing stack. Includes troubleshooting guide. Included in instant delivery.' }
            ].map((magnet, idx) => (
              <div key={idx} className="bg-white border-2 border-[#d9e2ec] rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:border-[#9fb3c8] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#486581] to-[#334e68] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-2xl font-bold text-white">{magnet.symbol}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-[#102a43]">
                      {magnet.title}
                    </h3>
                    <p className="text-[#334e68] leading-relaxed">
                      {magnet.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#102a43]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Frequently Asked Questions
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#9fb3c8] to-transparent"></div>
              <div className="w-2 h-2 bg-[#486581] rounded-full"></div>
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#9fb3c8] to-transparent"></div>
            </div>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, idx) => (
              <div key={idx} className="bg-white border-2 border-[#d9e2ec] rounded-2xl p-8 shadow-md hover:shadow-xl hover:border-[#9fb3c8] transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#486581] to-[#334e68] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-white">?</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-[#102a43]">
                      {faq.q}
                    </h3>
                    <p className="text-[#334e68] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-[#102a43] via-[#334e68] to-[#486581] text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#102a43]/50 via-transparent to-[#486581]/30"></div>
          <div className="absolute top-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-2xl" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Ready to Get Started?
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          </div>
          <p className="text-xl mb-8 text-white/95 leading-relaxed max-w-2xl mx-auto" style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)' }}>
            Get your validation toolkit above. Join the 60-minute technical deep-dive. Free, open source, MIT licensed.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-2">
              <span className="text-xs font-semibold">→</span> Instant toolkit access
            </span>
            <span className="flex items-center gap-2">
              <span className="text-xs font-semibold">✓</span> No credit card required
            </span>
            <span className="flex items-center gap-2">
              <span className="text-xs font-semibold">◉</span> {googleMeetLink ? 'Join link available' : 'Calendar invite (24h before)'}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-xs font-semibold">@</span> Unsubscribe anytime
            </span>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-[#486581] to-[#334e68] text-white p-4 rounded-full shadow-2xl hover:shadow-[#486581]/50 transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 min-w-[52px] min-h-[52px] flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  )
}

