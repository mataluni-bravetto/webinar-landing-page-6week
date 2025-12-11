import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '6 Week Webinar Series | Ai Reality Check',
  description: 'Join us Tuesday, December 16, 2025 at 11:00 AM – 12:30 PM EST. Transform your AI mastery. 6 weeks. 6 hours. FREE.',
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

