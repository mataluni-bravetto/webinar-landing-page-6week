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
  title: '6 Week Webinar Series | Ai Reality Check',
  description: `Join us for the first session of our 6-Week Webinar Series: Ai Reality Check.

━━━ WEBINAR DETAILS ━━━

Date: Tuesday, December 16, 2025
Time: 11:00 AM – 12:30 PM EST (90 minutes)
Time Zone: America/New_York

━━━ JOIN THE WEBINAR ━━━

Google Meet joining info:

Video call link: https://meet.google.com/mgm-wojn-kes

Or dial: (US) +1 650-597-3592
PIN: 697 719 929#

More phone numbers: https://tel.meet/mgm-wojn-kes?pin=2222925596942

━━━ WHAT YOU GET ━━━

✓ Instant access to validation toolkit
✓ Complete methodology guide
✓ GitHub repository access
✓ Live Q&A session

Register: ${typeof window !== 'undefined' ? window.location.origin : 'https://webinar-landing-page-backup.vercel.app'}/webinar`,
  location: 'https://meet.google.com/mgm-wojn-kes',
  startDate: '2025-12-16T16:00:00Z', // December 16, 2025, 11:00 AM EST = 4:00 PM UTC
  endDate: '2025-12-16T17:30:00Z', // 12:30 PM EST = 5:30 PM UTC (90 minutes)
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
UID:webinar-ai-reality-check-2025-12-16@bravetto.com
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
    link.download = '6-week-webinar-series-ai-reality-check.ics'
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

