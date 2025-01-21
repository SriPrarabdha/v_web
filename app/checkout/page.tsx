"use client"

import { Logo } from '@/components/Logo'
import { CustomizationForm } from '@/components/CustomizationForm'
import Link from 'next/link'
import { X } from 'lucide-react'
import { Suspense } from 'react'

export default function Checkout() {
  return (
    <main className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="relative bg-[#F94D8F] text-white py-2 px-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm">✨ Say &apos;I Love You&apos; in a Unique Way – Exclusive Valentine&apos;s Discounts</span>
          <span className="font-semibold">Get 60% OFF!</span>
          <span>✨</span>
        </div>
        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:opacity-75">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Logo */}
      <Logo />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Suspense fallback={<div className="text-center">Loading form...</div>}>
          <CustomizationForm />
        </Suspense>
      </div>
    </main>
  )
}

// check for phone number
// new input button for other in customization form
