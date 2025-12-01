'use client'

/**
 * Webinar Landing Page - Standalone Version
 * 
 * Webinar Date: Tuesday, December 2, 2025 at 2:00 PM EST
 * Optimized for conversion with A/B testing headlines
 */

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CountdownTimer } from '@/components/webinar/CountdownTimer'
import { RealTimeNotifications } from '@/components/webinar/RealTimeNotifications'
import { Star, Check, Mail, Lock, Shield, Zap, Rocket, Code, Users } from 'lucide-react'

export default function WebinarLandingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [headlineVariant, setHeadlineVariant] = useState(0)
  const [formData, setFormData] = useState({
    firstName: '',
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  // A/B test headlines - 5 variations
  const headlines = [
    {
      main: "How to Eliminate 90% of AI Code Failures Before Production",
      subline: "Join 10,000+ Developers Using the 3-Step Validation System (Zero False Positives)",
      cta: "Reserve My Spot - It's Free →"
    },
    {
      main: "This System Caught 47 Production Bugs Before Any User Saw Them",
      subline: "— Mike Chen, CTO at DataFlow | Join the Free 60-Minute Masterclass",
      cta: "Save My Seat →"
    },
    {
      main: "Eliminate 90% of AI Code Failures Before Production",
      subline: "Zero False Positives. Guaranteed. (60-Minute Free Masterclass)",
      cta: "Get Instant Access →"
    },
    {
      main: "Join 10,000+ Creators Building AI Products That Actually Work",
      subline: "60-Minute Masterclass: Real System, Real Code, Real Results ($597 Toolkit Free)",
      cta: "Join the Revolution →"
    },
    {
      main: "The 3-Step Validation System Used by Stripe & Shopify",
      subline: "to Ship Reliable AI Code (Free 60-Minute Masterclass + $597 Toolkit)",
      cta: "Claim Your Spot →"
    }
  ]
  
  const icp = searchParams?.get('icp') || 'developer'
  const isDeveloper = icp === 'developer'
  
  useEffect(() => {
    if (isDeveloper) {
      setHeadlineVariant(Math.floor(Math.random() * 3))
    } else {
      setHeadlineVariant(3 + Math.floor(Math.random() * 2))
    }
  }, [isDeveloper])
  
  const currentHeadline = headlines[headlineVariant]
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/webinar/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          email: formData.email,
          icp: icp,
          headline_variant: headlineVariant
        })
      })
      
      if (response.ok) {
        setShowSuccess(true)
        setTimeout(() => {
          router.push('/webinar/thank-you')
        }, 2000)
      } else {
        const error = await response.json()
        alert(error.error || 'Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-oxfordBlue-900 via-oxfordBlue-700 to-oxfordBlue-500 text-white py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
            <div className="bg-white/15 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-yellow-300 text-yellow-300" />
              ))}
              <span className="ml-1">4.4/5 (127 Reviews)</span>
            </div>
          </div>
          
          {/* Main Headline */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-2xl">
              {currentHeadline.main}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/95 max-w-4xl mx-auto">
              {currentHeadline.subline}
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="mb-8">
            <CountdownTimer 
              targetDate="2025-12-02"
              targetTime="2:00 PM EST"
            />
          </div>
          
          {/* Registration Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/15 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-8 md:p-10">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:border-white"
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-oxfordBlue-500 to-oxfordBlue-600 hover:from-oxfordBlue-400 hover:to-oxfordBlue-700 text-white font-bold text-lg py-6 rounded-xl shadow-2xl hover:shadow-oxfordBlue-500/50 transform hover:scale-[1.02] transition-all duration-300"
                >
                  {isSubmitting ? 'Registering...' : currentHeadline.cta}
                </button>
                
                {/* Trust Signals */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Your info is safe
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    No credit card required
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Unsubscribe anytime
                  </div>
                </div>
              </form>
              
              {showSuccess && (
                <div className="mt-6 p-4 bg-green-500/20 backdrop-blur-md border border-green-400/50 rounded-lg">
                  <p className="text-white text-center flex items-center justify-center gap-2">
                    <Check className="h-5 w-5" />
                    Registration successful! Redirecting...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white via-oxfordBlue-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-oxfordBlue-900">
              In This Free 60-Minute Masterclass, You&apos;ll Discover:
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'The 8 Guardian System', desc: 'Complete architecture for protecting your AI products' },
              { icon: Zap, title: 'High-Confidence Validation', desc: 'Mathematical validation using information theory' },
              { icon: Code, title: 'Production Integration', desc: 'Real code examples: TypeScript, Python, JavaScript' },
              { icon: Rocket, title: 'Scalable Architecture', desc: 'Enterprise-grade infrastructure that scales' },
              { icon: Users, title: 'Community Access', desc: 'Join 10,000+ developers building better AI' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white border-2 border-oxfordBlue-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-oxfordBlue-500 to-oxfordBlue-600 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-oxfordBlue-900">{feature.title}</h3>
                <p className="text-oxfordBlue-700">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Real-Time Notifications */}
      <RealTimeNotifications />
    </div>
  )
}

