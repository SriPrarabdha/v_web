"use client"
import React from 'react'
import { Music, Calendar, Clock, Globe, Mic } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const CustomizationForm = () => {
  const searchParams = useSearchParams()
  const selectedPlan = searchParams.get('plan')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (selectedPlan) {
      const planSelect = document.getElementById('plan') as HTMLSelectElement
      if (planSelect) {
        planSelect.value = selectedPlan
      }
    }
  }, [selectedPlan])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      const formValues = {
        plan: formData.get('plan'),
        contact: formData.get('contact'),
        mood: formData.get('mood'),
        occasion: formData.get('occasion'),
        length: formData.get('length'),
        language: formData.get('language'),
        artist: formData.get('artist'),
        text: formData.get('text')
      }

      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Form submitted successfully!')
        // Optional: Reset form
        event.currentTarget.reset()
        if (selectedPlan) {
          const planSelect = document.getElementById('plan') as HTMLSelectElement
          if (planSelect) {
            planSelect.value = selectedPlan
          }
        }
      } else {
        throw new Error(data.error || 'Failed to submit form')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 item-center">
      <h2 className="text-3xl font-bold item-center text-gray-800 mb-6">Customize Your Song</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="plan" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Music className="h-4 w-4 mr-1" /> Select Plan
          </label>
          <select
            id="plan"
            name="plan"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
            required
            defaultValue={selectedPlan || ""}
          >
            <option value="">Select a Plan</option>
            <option value="basic">Basic Plan ( ₹999 )</option>
            <option value="enhanced">Enhanced Plan ( ₹1999 )</option>
            <option value="premium">Premium Plan ( ₹2999 )</option>
            <option value="other">other</option>
          </select>
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
        
        <div>
          <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Music className="h-4 w-4 mr-1" /> Choose Mood
          </label>
          <select
            id="mood"
            name="mood"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
            required
          >
            <option value="">Select a mood</option>
            <option value="romantic">Romantic</option>
            <option value="joyful">Joyful</option>
            <option value="emotional">Emotional</option>
            <option value="other">other</option>
          </select>
        </div>

        <div>
          <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Calendar className="h-4 w-4 mr-1" /> Select Occasion
          </label>
          <select
            id="occasion"
            name="occasion"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
            required
          >
            <option value="">Select an occasion</option>
            <option value="valentine">Valentine</option>
            <option value="proposal">Proposal</option>
            <option value="anniversary">Anniversary</option>
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday</option>
            
          </select>
        </div>

        <div>
          <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Clock className="h-4 w-4 mr-1" /> Length of the Song
          </label>
          <select
            id="length"
            name="length"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
            required
          >
            <option value="">Select song length</option>
            <option value="2">1-2 minutes</option>
            <option value="5">2-3 minutes</option>
          </select>
        </div>

        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Globe className="h-4 w-4 mr-1" /> Language of the Song
          </label>
          <select
            id="language"
            name="language"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
            required
          >
            <option value="">Select language</option>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
          </select>
        </div>

        <div>
          <label htmlFor="artist" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Mic className="h-4 w-4 mr-1" /> Preferred Artist
          </label>
          <select
            id="artist"
            name="artist"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
            required
          >
            <option value="">Select preferred artist</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
            Mention who is the song to and who is the song from
          </label>
          <input
            type="text"
            id="text"
            name="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
            placeholder="This song is for my wife Neha!!"
            required
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#F94D8F] text-white py-3 rounded-md hover:bg-[#E43D7F] transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}
