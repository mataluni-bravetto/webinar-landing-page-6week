'use client'

/**
 * Countdown Timer Component
 * 20-40% conversion increase - Creates urgency/scarcity
 * 
 * Pattern: Urgency × Scarcity × Deadline Pressure × ONE
 */

import { useState, useEffect } from 'react'
import { Calendar, Clock, Rocket } from 'lucide-react'

interface CountdownTimerProps {
  targetDate: string // ISO date string
  targetTime: string // Time string (e.g., "2:00 PM EST")
  onExpired?: () => void
}

export function CountdownTimer({ targetDate, targetTime, onExpired }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false
  })

  useEffect(() => {
    // Parse target date and time
    const [datePart] = targetDate.split('T')
    const [hours, minutes] = targetTime.includes('PM') 
      ? targetTime.replace(' PM EST', '').split(':').map((v, i) => i === 0 ? parseInt(v) + 12 : parseInt(v))
      : targetTime.replace(' AM EST', '').split(':').map(v => parseInt(v))
    
    const webinarDate = new Date(`${datePart}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00-05:00`)

    const interval = setInterval(() => {
      const now = new Date()
      const diff = webinarDate.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true })
        clearInterval(interval)
        if (onExpired) onExpired()
        return
      }

      setTimeRemaining({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        expired: false
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate, targetTime, onExpired])

  if (timeRemaining.expired) {
    return (
      <div className="bg-white border-2 border-oxfordBlue-500 rounded-xl p-6 mb-6 shadow-lg max-w-[85%] mx-auto">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Rocket className="h-6 w-6 text-oxfordBlue-600" />
          <p className="text-center text-oxfordBlue-900 font-bold text-lg">
            Webinar is live! Join now →
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border-2 border-oxfordBlue-500 rounded-xl p-6 mb-6 shadow-lg max-w-[85%] mx-auto">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-oxfordBlue-600" />
        <p className="text-center text-oxfordBlue-900 font-semibold text-lg">
          Webinar Date & Time:
        </p>
      </div>
      <div className="text-center mb-4">
        <p className="text-oxfordBlue-700 font-medium mb-1" style={{ fontSize: '14pt' }}>
          December 2, 2025
        </p>
        <div className="flex items-center justify-center gap-2">
          <Clock className="h-4 w-4 text-oxfordBlue-600" />
          <p className="text-oxfordBlue-700 font-medium" style={{ fontSize: '14pt' }}>
            2:00 PM EST
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mb-4">
        <p className="text-center text-oxfordBlue-700 font-semibold text-lg">
          Starts in:
        </p>
      </div>
      <div className="flex justify-center gap-3 md:gap-6 mb-4">
        <div className="text-center bg-oxfordBlue-50 rounded-lg p-3 min-w-[60px] shadow-md border border-oxfordBlue-200">
          <div className="text-2xl md:text-4xl font-bold text-oxfordBlue-900">{timeRemaining.days}</div>
          <div className="text-xs text-oxfordBlue-700 font-medium">Days</div>
        </div>
        <div className="text-oxfordBlue-700 text-2xl md:text-3xl font-bold self-center">:</div>
        <div className="text-center bg-oxfordBlue-50 rounded-lg p-3 min-w-[60px] shadow-md border border-oxfordBlue-200">
          <div className="text-2xl md:text-4xl font-bold text-oxfordBlue-900">{String(timeRemaining.hours).padStart(2, '0')}</div>
          <div className="text-xs text-oxfordBlue-700 font-medium">Hours</div>
        </div>
        <div className="text-oxfordBlue-700 text-2xl md:text-3xl font-bold self-center">:</div>
        <div className="text-center bg-oxfordBlue-50 rounded-lg p-3 min-w-[60px] shadow-md border border-oxfordBlue-200">
          <div className="text-2xl md:text-4xl font-bold text-oxfordBlue-900">{String(timeRemaining.minutes).padStart(2, '0')}</div>
          <div className="text-xs text-oxfordBlue-700 font-medium">Minutes</div>
        </div>
        <div className="text-oxfordBlue-700 text-2xl md:text-3xl font-bold self-center">:</div>
        <div className="text-center bg-oxfordBlue-50 rounded-lg p-3 min-w-[60px] shadow-md border border-oxfordBlue-200">
          <div className="text-2xl md:text-4xl font-bold text-oxfordBlue-900">{String(timeRemaining.seconds).padStart(2, '0')}</div>
          <div className="text-xs text-oxfordBlue-700 font-medium">Seconds</div>
        </div>
      </div>
      <p className="text-center text-sm text-oxfordBlue-700 font-medium">
        Limited to Founding 100 members
      </p>
    </div>
  )
}

