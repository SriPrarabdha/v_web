import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { playfair } from "@/app/layout"
import { Facebook, Instagram, Send, Youtube } from 'lucide-react'
import Link from "next/link"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-pink-50 px-10">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className={`${playfair.className} text-3xl font-bold sm:text-4xl`}>
                Start Your Musical Journey
              </h2>
              <p className="text-muted-foreground text-lg">
                Have questions about our services? Get in touch with us, and we&apos;ll help you create
                the perfect musical gift.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                  <Send className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-muted-foreground">help@mymelodiousmemories.in</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Follow Us</p>
                <div className="flex gap-4">
                  <Link href="https://www.instagram.com/_melodious_memories?igsh=YzB4M3F6eHhlaHZz" className="text-muted-foreground hover:text-pink-600 transition-colors">
                    <Instagram className="h-6 w-6" />
                  </Link>
                  {/* <Link href="#" className="text-muted-foreground hover:text-pink-600 transition-colors">
                    <Facebook className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-pink-600 transition-colors">
                    <Youtube className="h-6 w-6" />
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="text-xl bold">
              Reach out to us for any further queries
              </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
            Contact Number
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              +91
            </span>
            <input
              type="tel"
              id="contact"
              name="contact"
              className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
              pattern="[0-9]{10}"
              maxLength={10}
              placeholder="Enter 10-digit number"
              title="Please enter a valid 10-digit phone number"
              required
            />
          </div>
        </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Any Queries
              </label>
              <Textarea
                id="message"
                placeholder="How will I recieve my song?"
                className="min-h-[150px]"
              />
            </div>
            <Button size="lg" className="w-full sm:w-auto">
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

