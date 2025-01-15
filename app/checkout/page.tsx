import { Logo } from '@/components/Logo'
import { PackageSelection } from '@/components/PackageSelection'
import Link from 'next/link'
import { X } from 'lucide-react'

export default function Home() {
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

      {/* Navigation */}
      <nav className="border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-8">
              <Link href="#how-it-works" className="py-4 text-gray-700 hover:text-[#F94D8F]">
                How It Works
              </Link>
              <Link href="#hampers" className="py-4 text-gray-700 hover:text-[#F94D8F]">
                Hampers
              </Link>
              <Link href="#music-services" className="py-4 text-gray-700 hover:text-[#F94D8F]">
                Music Services
              </Link>
              <Link href="#testimonials" className="py-4 text-gray-700 hover:text-[#F94D8F]">
                Testimonials
              </Link>
            </div>
            <button className="bg-[#F94D8F] text-white px-6 py-2 rounded-full hover:bg-[#E43D7F] transition-colors">
              Start Your Story
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-bold leading-tight">
            Turn Your Love Story Into a{' '}
            <span className="font-script text-[#F94D8F]">Song</span> This Valentine&apos;s!
          </h2>
          <p className="mt-6 text-gray-600 text-lg">
            Personalized songs and Valentine&apos;s hampers to make your moments unforgettable. Create a unique musical gift that will be cherished forever.
          </p>
        </div>
      </section>

      {/* Package Selection Section with Floating Elements */}
      <PackageSelection />
    </main>
  )
}

