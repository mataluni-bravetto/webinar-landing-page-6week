import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Webinar Landing Page - AiGuardian',
  description: 'Register for the AiGuardian Webinar - December 2, 2025',
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

