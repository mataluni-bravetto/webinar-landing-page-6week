'use client'

/**
 * MASTER AI WEBINAR LANDING PAGE
 * 
 * Pattern: Living Canvas × Webinar × ONE
 * Guardians: AEYON × META × YAGNI
 * 
 * 6-Week Webinar Series Landing Page
 * Interactive p5.js canvas with particle animation
 */

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/navigation'

// Webinar: Tuesday, December 16, 2025 at 11:00 AM EST (4:00 PM UTC)
// Duration: 90 minutes (11:00 AM - 12:30 PM EST)
const WEBINAR_START_DATE = new Date('2025-12-16T16:00:00Z') // 11:00 AM EST = 4:00 PM UTC
const WEBINAR_END_DATE = new Date('2025-12-16T17:30:00Z') // 12:30 PM EST = 5:30 PM UTC
const GOOGLE_MEET_LINK = 'https://meet.google.com/mgm-wojn-kes'
const GOOGLE_MEET_PHONE = '+1 650-597-3592'
const GOOGLE_MEET_PIN = '697 719 929'

export default function MasterAIWebinarPage() {
  const router = useRouter()
  const canvasRef = useRef<HTMLDivElement>(null)
  const p5InstanceRef = useRef<any>(null)
  const [countdown, setCountdown] = useState('Starting Soon...')
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({ firstName: '', email: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<{ firstName?: string; email?: string; submit?: string }>({})
  const registrationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = WEBINAR_START_DATE.getTime() - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      } else {
        setCountdown('Starting Soon...')
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [mounted])

  useEffect(() => {
    if (!mounted || !canvasRef.current) return

    const loadP5 = () => {
      if (typeof window !== 'undefined' && (window as any).p5) {
        const p5 = (window as any).p5

        // Clean up existing instance
        if (p5InstanceRef.current) {
          p5InstanceRef.current.remove()
        }

        const sketch = (p: any) => {
          let particles: any[] = []

          p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight)
            const canvas = p.canvas
            if (canvas && canvasRef.current) {
              canvasRef.current.appendChild(canvas)
            }

            for (let i = 0; i < 100; i++) {
              particles.push({
                x: p.random(p.width),
                y: p.random(p.height),
                vx: p.random(-1, 1),
                vy: p.random(-1, 1),
                size: p.random(2, 5),
                hue: p.random(40, 60)
              })
            }
          }

          p.draw = () => {
            p.background(10, 10, 18, 20)

            // Particles flowing toward center (learning convergence)
            for (let particle of particles) {
              let dx = p.width / 2 - particle.x
              let dy = p.height / 2 - particle.y
              let dist = p.sqrt(dx * dx + dy * dy)

              if (dist > 0) {
                particle.vx += (dx / dist) * 0.01
                particle.vy += (dy / dist) * 0.01
              }

              particle.vx *= 0.98
              particle.vy *= 0.98
              particle.x += particle.vx
              particle.y += particle.vy

              p.push()
              p.colorMode(p.HSB)
              p.fill(particle.hue, 100, 100, 150)
              p.noStroke()
              p.ellipse(particle.x, particle.y, particle.size, particle.size)
              p.pop()
            }
          }

          p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight)
          }
        }

        p5InstanceRef.current = new p5(sketch)
      }
    }

    // Check if p5 is already loaded
    if ((window as any).p5) {
      loadP5()
    } else {
      // Wait for script to load
      const checkP5 = setInterval(() => {
        if ((window as any).p5) {
          clearInterval(checkP5)
          loadP5()
        }
      }, 100)

      return () => {
        clearInterval(checkP5)
        if (p5InstanceRef.current) {
          p5InstanceRef.current.remove()
        }
      }
    }

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove()
      }
    }
  }, [mounted])

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault()
    registrationRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

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
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"
        strategy="afterInteractive"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Poppins:wght@300;400;600;700&display=swap"
        rel="stylesheet"
      />
      <div className="relative min-h-screen bg-[#0a0a12] text-white overflow-x-hidden">
        {/* Canvas Container */}
        <div
          ref={canvasRef}
          id="canvas-container"
          className="fixed top-0 left-0 w-full h-full z-0"
        />

        {/* Content */}
        <div className="relative z-10 min-h-screen px-8 py-16 max-w-[1200px] mx-auto">
          <h1
            className="font-['Lora'] text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.1] mb-8"
            style={{
              background: 'linear-gradient(135deg, #fff, #ffd700, #ff6b35)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            6 Week Webinar Series<br />
            Ai Reality Check
          </h1>

          <p className="text-2xl text-center text-gray-400 mb-8">
            Transform your AI mastery. 6 weeks. 6 hours. FREE.
          </p>
          
          <div className="text-center mb-8 text-lg text-gray-300">
            <p className="mb-2">
              <strong>Tuesday, December 16, 2025</strong>
            </p>
            <p className="mb-2">
              11:00 AM – 12:30 PM EST
            </p>
            <p className="text-sm text-gray-400">
              (90 minutes)
            </p>
          </div>

          <div
            className="text-[clamp(2rem,5vw,4rem)] font-bold text-[#ffd700] my-12 text-center"
            id="countdown"
          >
            {countdown}
          </div>
          
          {/* Google Meet Link Section */}
          <div className="max-w-2xl mx-auto mb-12 bg-white/10 backdrop-blur-md border border-[#ffd700]/30 rounded-[20px] p-6 text-center">
            <h3 className="text-xl font-bold mb-4 text-[#ffd700]">Join the Webinar</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-300 mb-2">Video call link:</p>
                <a
                  href={GOOGLE_MEET_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-[#ffd700] to-[#ff6b35] text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all shadow-lg hover:shadow-xl"
                >
                  Join Google Meet →
                </a>
              </div>
              <div className="text-sm text-gray-400">
                <p>Or dial: <a href={`tel:${GOOGLE_MEET_PHONE}`} className="text-[#ffd700] hover:underline">{GOOGLE_MEET_PHONE}</a></p>
                <p>PIN: <span className="font-mono">{GOOGLE_MEET_PIN}#</span></p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-16">
            {[
              {
                number: 1,
                title: 'The AI Reality Check',
                description: 'Discover hidden costs and 7 failure patterns',
              },
              {
                number: 2,
                title: 'Multi-Platform Mastery',
                description: 'Master multiple AI platforms without losing your mind',
              },
              {
                number: 3,
                title: 'AI Biases & Fallacies',
                description: 'Recognize and overcome AI limitations',
              },
              {
                number: 4,
                title: 'Breaking the Loop',
                description: 'Escape recursive AI patterns',
              },
              {
                number: 5,
                title: 'Advanced Mastery',
                description: 'Take your AI skills to the next level',
              },
              {
                number: 6,
                title: 'The AbëONE Revelation',
                description: 'The future of AI-human collaboration',
              },
            ].map((week) => (
              <div
                key={week.number}
                className="bg-white/5 border border-[#ffd700]/30 rounded-[20px] p-8 transition-all duration-300 hover:-translate-y-[10px] hover:border-[#ffd700] hover:shadow-[0_20px_40px_rgba(255,215,0,0.3)]"
              >
                <div className="text-5xl text-[#ffd700] font-bold mb-4">
                  {week.number}
                </div>
                <div className="font-['Lora'] text-2xl text-white mb-4">
                  {week.title}
                </div>
                <p className="text-gray-300">{week.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a
              href="#register"
              onClick={handleRegisterClick}
              className="inline-block px-12 py-5 bg-gradient-to-r from-[#ffd700] to-[#ff6b35] text-black text-xl font-bold rounded-[50px] mt-8 transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_40px_rgba(255,215,0,0.5)]"
            >
              Register Now — FREE
            </a>
          </div>

          {/* Registration Form Section */}
          <div ref={registrationRef} id="register" className="mt-24 pt-16">
            <div className="bg-white/10 backdrop-blur-md border border-[#ffd700]/30 rounded-[20px] p-8 md:p-12 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 font-['Lora']">
                Register for the 6-Week Series
              </h2>
              <p className="text-center text-gray-300 mb-8">
                Join us for this FREE webinar series. Transform your AI mastery in just 6 weeks.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
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
                    } text-white placeholder-white/70 focus:outline-none focus:border-[#ffd700] transition-all`}
                  />
                  {formErrors.firstName && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
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
                    } text-white placeholder-white/70 focus:outline-none focus:border-[#ffd700] transition-all`}
                  />
                  {formErrors.email && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>
                
                {formErrors.submit && (
                  <div className="p-3 bg-red-500/20 border border-red-400 rounded-lg">
                    <p className="text-red-200 text-sm">{formErrors.submit}</p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-12 py-5 bg-gradient-to-r from-[#ffd700] to-[#ff6b35] text-black text-xl font-bold rounded-[50px] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_40px_rgba(255,215,0,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Registering...
                    </span>
                  ) : (
                    'Register Now — FREE'
                  )}
                </button>
                
                <p className="text-sm text-gray-400 text-center mt-4">
                  ✓ Free registration · ✓ No credit card required · ✓ Instant access
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
