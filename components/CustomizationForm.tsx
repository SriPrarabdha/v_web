"use client"
import React from 'react'
import fs from 'fs';
import { Music, Calendar, Clock, Globe, Mic } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import payuHostedCheckout from '@api/payu-hosted-checkout'

export const CustomizationForm = () => {
  const searchParams = useSearchParams()
  const selectedPlan = searchParams.get('plan')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Plan prices mapping
  const planPrices = {
    basic: 999,
    enhanced: 1999,
    premium: 2999
  }

  useEffect(() => {
    if (selectedPlan) {
      const planSelect = document.getElementById('plan') as HTMLSelectElement
      if (planSelect) {
        planSelect.value = selectedPlan
      }
    }
  }, [selectedPlan])

  const processPayment = async (formValues: any, amount: number) => {
    try {
      // Initialize PayU payment
      const paymentResponse = await payuHostedCheckout.payUHostedCheckout({
        accept: 'text/plain',
        amount: amount,
        productinfo: `${formValues.plan} Plan - Customized Song`,
        firstname: formValues.text.split('!!')[0], // Extract name from text field
        phone: formValues.contact,
        email: 'customer@example.com', // You might want to add an email field to your form
        surl: '/api/payment/success',
        furl: '/api/payment/failure'
      })

      return paymentResponse.data
    } catch (error) {
      console.error('Payment initialization failed:', error)
      throw new Error('Payment initialization failed')
    }
  }

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

      // Get plan amount
      const amount = planPrices[formValues.plan as keyof typeof planPrices] || 0
      if (!amount) {
        throw new Error('Invalid plan selected')
      }

      // First save form data
      const formResponse = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      })

      const responseData = await formResponse.json()

      if (!responseData.success) {
        throw new Error(responseData.error || 'Failed to submit form')
      }

      // Then initiate payment
      const paymentData = await processPayment(formValues, amount)
      
      // Redirect to PayU payment page if needed
      if (paymentData && paymentData.redirectUrl) {
        window.location.href = paymentData.redirectUrl
      } else {
        toast.success('Form submitted successfully!')
        // Optional: Reset form
        event.currentTarget.reset()
        if (selectedPlan) {
          const planSelect = document.getElementById('plan') as HTMLSelectElement
          if (planSelect) {
            planSelect.value = selectedPlan
          }
        }
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to process request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 item-center">
      <h2 className="text-3xl font-bold item-center text-gray-800 mb-6">Customize Your Song</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rest of the form components remain the same */}
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
        
        {/* ... Rest of the form fields ... */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#F94D8F] text-white py-3 rounded-md hover:bg-[#E43D7F] transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </form>
    </div>
  )
}