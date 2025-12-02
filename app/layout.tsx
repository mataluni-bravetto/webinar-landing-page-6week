import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Webinar Landing Page - AiGuardian',
  description: 'Register for the AiGuardian Webinar - Thursday, December 4, 2025 at 2:00 PM EST',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

