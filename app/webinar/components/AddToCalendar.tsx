'use client'

/**
 * ADD TO CALENDAR COMPONENT
 * 
 * YAGNI × JØHN Approved | Conversion Optimized
 * Pattern: CALENDAR × ADD × CONVERSION × ONE
 * Guardians: AEYON × JØHN × YAGNI × ALRAX
 */

interface CalendarEvent {
  title: string
  description: string
  location: string
  startDate: string // ISO 8601 format
  endDate: string // ISO 8601 format
  timeZone: string
}

// Webinar details - single source of truth
const WEBINAR_EVENT: CalendarEvent = {
  title: 'AI Code Validation Webinar',
  description: `Join us for a 60-minute technical deep-dive on validating AI-generated code before production.

━━━ TECHNICAL AGENDA ━━━

0:00-10:00 | AI Code Failure Analysis
What percentage of AI-generated code actually works? We tested 1,200+ functions across Claude, GPT-4, and Copilot. Results: 40-60% contain phantom features, 27.25% have security vulnerabilities, 15% fail silently with edge cases.

10:00-30:00 | 3-Step Validation Pipeline
Static Analysis: AST parsing for hallucinated imports, dependency verification, type inference. Runtime Verification: Automated test generation, property-based testing. Security Scanning: OWASP Top 10 detection, dependency vulnerability checking.

30:00-50:00 | CI/CD Integration
GitHub Actions workflow (copy-paste ready), pre-commit hooks, PR check integration. How to handle false positives without slowing down.

50:00-60:00 | Live Q&A + Edge Cases
Bring your worst AI-generated code. We'll validate it live and discuss framework-specific quirks.

━━━ WHAT YOU GET ━━━

✓ 12 TypeScript Validation Functions
✓ 47-Page Methodology Guide
✓ GitHub Actions Workflow
✓ Accuracy Report (847 functions)
✓ 15-Step Integration Checklist

━━━ JOIN THE WEBINAR ━━━

Google Meet joining info:

Video call link: https://meet.google.com/cve-fpwz-gxa

Or dial: (US) +1 650-667-2928
PIN: 451 472 747#

More phone numbers: https://tel.meet/cve-fpwz-gxa?pin=3114404973049

Register: https://webinar-landing-page-backup-exur1u1rf-bravetto.vercel.app/webinar`,
  location: 'https://meet.google.com/cve-fpwz-gxa',
  startDate: '2025-12-04T19:00:00Z', // December 4, 2025, 2:00 PM EST = 7:00 PM UTC
  endDate: '2025-12-04T20:00:00Z', // 60 minutes later (3:00 PM EST)
  timeZone: 'America/New_York'
}

// Generate calendar URLs
function generateCalendarUrls(event: CalendarEvent) {
  // Parse ISO date and convert to format needed for calendar URLs
  const startDateObj = new Date(event.startDate)
  const endDateObj = new Date(event.endDate)
  
  // Format for Google Calendar (YYYYMMDDTHHMMSSZ)
  const formatForGoogle = (date: Date) => {
    const year = date.getUTCFullYear()
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const day = String(date.getUTCDate()).padStart(2, '0')
    const hours = String(date.getUTCHours()).padStart(2, '0')
    const minutes = String(date.getUTCMinutes()).padStart(2, '0')
    const seconds = String(date.getUTCSeconds()).padStart(2, '0')
    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`
  }
  
  const startDateFormatted = formatForGoogle(startDateObj)
  const endDateFormatted = formatForGoogle(endDateObj)
  
  // Google Calendar URL (with Peacock/Teal color - ID 7, hex #009788)
  // Color options: Blue (ID 9, hex #4285F4) or Peacock (ID 7, hex #009788)
  // Using Peacock/Teal as recommended for professional webinars
  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDateFormatted}/${endDateFormatted}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&ctz=${encodeURIComponent(event.timeZone)}&color=%23009788`
  
  // Outlook Calendar URL (ISO format)
  const outlookStart = startDateObj.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const outlookEnd = endDateObj.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&startdt=${outlookStart}&enddt=${outlookEnd}&body=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`
  
  // iCal file content
  const now = new Date()
  const dtstamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const icalContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Bravetto//AI Code Validation Webinar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:webinar-ai-code-validation-2025-12-04@bravetto.com
DTSTAMP:${dtstamp}
DTSTART:${startDateFormatted}
DTEND:${endDateFormatted}
SUMMARY:${event.title}
DESCRIPTION:${event.description.replace(/\n/g, '\\n')}
LOCATION:${event.location}
URL:${event.location}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`
  
  const icalBlob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' })
  const icalUrl = URL.createObjectURL(icalBlob)
  
  return { googleUrl, outlookUrl, icalUrl, icalContent }
}

interface AddToCalendarProps {
  variant?: 'button' | 'dropdown'
  className?: string
}

export function AddToCalendar({ variant = 'button', className = '' }: AddToCalendarProps) {
  const urls = generateCalendarUrls(WEBINAR_EVENT)
  
  const handleGoogleClick = () => {
    window.open(urls.googleUrl, '_blank', 'noopener,noreferrer')
  }
  
  const handleOutlookClick = () => {
    window.open(urls.outlookUrl, '_blank', 'noopener,noreferrer')
  }
  
  const handleICalDownload = () => {
    const link = document.createElement('a')
    link.href = urls.icalUrl
    link.download = 'ai-code-validation-webinar.ics'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(urls.icalUrl)
  }
  
  if (variant === 'dropdown') {
    return (
      <div className={`relative inline-block ${className}`}>
        <button
          className="bg-gradient-to-r from-[#486581] to-[#334e68] text-white hover:shadow-xl transform hover:scale-[1.02] transition-all shadow-lg py-3 px-6 rounded-lg font-semibold text-base flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault()
            const menu = document.getElementById('calendar-menu')
            menu?.classList.toggle('hidden')
          }}
        >
          <span>📅</span>
          <span>Add to Calendar</span>
          <span>▼</span>
        </button>
        <div
          id="calendar-menu"
          className="hidden absolute top-full left-0 mt-2 bg-white border-2 border-[#d9e2ec] rounded-lg shadow-xl z-50 min-w-[200px]"
        >
          <button
            onClick={handleGoogleClick}
            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-2 text-[#102a43]"
          >
            <span>📅</span>
            <span>Google Calendar</span>
          </button>
          <button
            onClick={handleOutlookClick}
            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-2 text-[#102a43]"
          >
            <span>📅</span>
            <span>Outlook</span>
          </button>
          <button
            onClick={handleICalDownload}
            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-2 text-[#102a43]"
          >
            <span>📥</span>
            <span>Download .ics</span>
          </button>
        </div>
      </div>
    )
  }
  
  // Button variant (default)
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      <button
        onClick={handleGoogleClick}
        className="bg-white border-2 border-[#486581] text-[#486581] hover:bg-[#f0f4f8] transition-all py-3 px-6 rounded-lg font-semibold text-sm flex items-center gap-2 shadow-md hover:shadow-lg"
        aria-label="Add to Google Calendar"
      >
        <span>📅</span>
        <span>Google</span>
      </button>
      <button
        onClick={handleOutlookClick}
        className="bg-white border-2 border-[#486581] text-[#486581] hover:bg-[#f0f4f8] transition-all py-3 px-6 rounded-lg font-semibold text-sm flex items-center gap-2 shadow-md hover:shadow-lg"
        aria-label="Add to Outlook Calendar"
      >
        <span>📅</span>
        <span>Outlook</span>
      </button>
      <button
        onClick={handleICalDownload}
        className="bg-white border-2 border-[#486581] text-[#486581] hover:bg-[#f0f4f8] transition-all py-3 px-6 rounded-lg font-semibold text-sm flex items-center gap-2 shadow-md hover:shadow-lg"
        aria-label="Download iCal file"
      >
        <span>📥</span>
        <span>iCal</span>
      </button>
    </div>
  )
}

