'use client'

/**
 * ROOT PAGE - YAGNI APPROVED
 * 
 * Pattern: Root × Redirect × YAGNI × ONE
 * Guardians: YAGNI × AEYON
 * 
 * Simple redirect to webinar page. Nothing more needed.
 */

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/webinar')
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">Redirecting to webinar...</p>
      </div>
    </div>
  )
}

