
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

  // Plan prices mapping
  const planPrices = {
    basic: 997,
    enhanced: 1997,
    premium: 2997,
  }

  // Generate transaction ID
  const generateTxnId = () => {
    return `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
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
      // Detailed logging
      console.log('Processing Payment:', {
        plan: formValues.plan,
        amount: amount,
        contact: formValues.contact
      })

      // Prepare transaction details
      const txnid = generateTxnId()
      
      // Prepare form data for PayU
      const payuFormData = {
        key: process.env.NEXT_PUBLIC_PAYU_MERCHANT_KEY || 'JPM7Fg',
        txnid: txnid,
        amount: amount,
        productinfo: `${formValues.plan} Plan - Customized Song`,
        firstname: formValues.firstname || 'Customer',
        email: formValues.email || 'customer@example.com',
        phone: formValues.contact,
        surl: 'https://cbjs.payu.in/sdk/success',
        furl: 'https://cbjs.payu.in/sdk/failure'
      }

      // Generate hash via API call
      const hashResponse = await fetch('/api/generate-hash', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          formData: payuFormData 
        })
      })

      if (!hashResponse.ok) {
        const errorData = await hashResponse.json()
        console.error('Hash generation failed:', errorData)
        throw new Error('Failed to generate payment hash')
      }

      const { hash } = await hashResponse.json()
      
      // Detailed logging
      console.log('Generated Hash:', hash)

      // Create PayU payment form
      const paymentForm = document.createElement('form')
      paymentForm.method = 'post'
      paymentForm.action = 'https://secure.payu.in/_payment'
      
      // Add all form data as hidden inputs
      const formDataWithHash = {
        ...payuFormData,
        hash: hash,
        service_provider: 'payu_paisa'
      }

      Object.entries(formDataWithHash).forEach(([key, value]) => {
        const hiddenField = document.createElement('input')
        hiddenField.type = 'hidden'
        hiddenField.name = key
        hiddenField.value = value as string
        paymentForm.appendChild(hiddenField)
      })

      document.body.appendChild(paymentForm)
      paymentForm.submit()

      return { success: true }
    } catch (error) {
      console.error('Complete Payment Processing Error:', error)
      
      // More detailed error logging
      if (error instanceof Error) {
        console.error('Error Name:', error.name)
        console.error('Error Message:', error.message)
        console.error('Error Stack:', error.stack)
      }

      throw error
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const formValues = Object.fromEntries(new FormData(event.currentTarget))

      // Save form data to Google Sheets
      try {
        const sheetResponse = await fetch('/api/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: formValues.firstname,
            email: formValues.email,
            contact: formValues.contact,
            occasion: formValues.occasion,
            details: formValues.details,
            plan: formValues.plan,
            amount: planPrices[formValues.plan as keyof typeof planPrices] || 0,
            transactionId: generateTxnId(),
            timestamp: new Date().toISOString()
          }),
        })

        if (!sheetResponse.ok) {
          console.error('Failed to save to Google Sheets')
        }
      } catch (error) {
        console.error('Error saving to Google Sheets:', error)
      }

      // Get plan amount
      const amount = planPrices[formValues.plan as keyof typeof planPrices] || 0
      if (!amount) {
        throw new Error('Invalid plan selected')
      }

      // Then initiate payment
      await processPayment(formValues, amount)
      
      toast.success('Form submitted successfully!')
      
      // Optional: Reset form
      event.currentTarget.reset()
      if (selectedPlan) {
        const planSelect = document.getElementById('plan') as HTMLSelectElement
        if (planSelect) {
          planSelect.value = selectedPlan
        }
      }
    } catch (error) {
      console.error('Complete Submission Error:', error)
      
      // More detailed error handling
      if (error instanceof Error) {
        console.error('Error Name:', error.name)
        console.error('Error Message:', error.message)
        console.error('Error Stack:', error.stack)
        
        // More specific error messaging
        if (error.message.includes('plan')) {
          toast.error('Please select a valid plan.')
        } else if (error.message.includes('form')) {
          toast.error('Unable to save form details. Please try again.')
        } else {
          toast.error('Failed to process request. Please check your information and try again.')
        }
      } else {
        toast.error('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 item-center">
      <h2 className="text-3xl font-bold item-center text-gray-800 mb-6">Customize Your Song</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Plan Selection */}
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
            <option value="basic">Basic Plan ( ₹997 )</option>
            <option value="enhanced">Enhanced Plan ( ₹1997 )</option>
            <option value="premium">Premium Plan ( ₹2997 )</option>
            <option value="other">other</option>
          </select>
        </div>
        
        {/* Contact Number */}
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
            <option value="telegu">Telegu</option>
            <option value="kannada">Kannada</option>
            <option value="hindi">Hindi</option>
            <option value="tamil">Tamil</option>
            <option value="punjabi">Punjabi</option>

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
          <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
            Mention who is the song to and who is the song from
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
            placeholder="This song is for my wife Neha!!"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
            placeholder="example@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
            What are the 4 things from your story that must be included in the song?
          </label>
          <input
            type="text"
            id="details"
            name="details"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
            placeholder="1) her name Khushi, 2) how me met, 3) baby boo, 4) moving downtown"
            required
          />
        </div>

        
        {/* Submit Button */}
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

// working code.....

// "use client"
// import React from 'react'
// import { Music,Calendar, Clock, Globe, Mic } from 'lucide-react'
// import { useSearchParams } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import { toast } from 'sonner'

// export const CustomizationForm = () => {
//   const searchParams = useSearchParams()
//   const selectedPlan = searchParams.get('plan')
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   // Plan prices mapping
//   const planPrices = {
//     basic: 999,
//     enhanced: 1999,
//     premium: 2999,
//     my:9
//   }

//   // Generate transaction ID
//   const generateTxnId = () => {
//     return `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
//   }

//   useEffect(() => {
//     if (selectedPlan) {
//       const planSelect = document.getElementById('plan') as HTMLSelectElement
//       if (planSelect) {
//         planSelect.value = selectedPlan
//       }
//     }
//   }, [selectedPlan])

//   const processPayment = async (formValues: any, amount: number) => {
//     try {
//       // Detailed logging
//       console.log('Processing Payment:', {
//         plan: formValues.plan,
//         amount: amount,
//         contact: formValues.contact
//       })

//       // Prepare transaction details
//       const txnid = generateTxnId()
      
//       // Prepare form data for PayU
//       const payuFormData = {
//         key: process.env.NEXT_PUBLIC_PAYU_MERCHANT_KEY || 'JPM7Fg',
//         txnid: txnid,
//         amount: amount,
//         productinfo: `${formValues.plan} Plan - Customized Song`,
//         firstname: formValues.text ? formValues.text.split('!!')[0] : 'Customer',
//         email: formValues.email || 'customer@example.com',
//         phone: formValues.contact,
//         surl: 'https://secure.payu.in/response',
//         furl: 'https://secure.payu.in/response'
//       }

//       // Generate hash via API call
//       const hashResponse = await fetch('/api/generate-hash', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           formData: payuFormData 
//         })
//       })

//       if (!hashResponse.ok) {
//         const errorData = await hashResponse.json()
//         console.error('Hash generation failed:', errorData)
//         throw new Error('Failed to generate payment hash')
//       }

//       const { hash } = await hashResponse.json()
      
//       // Detailed logging
//       console.log('Generated Hash:', hash)

//       // Create PayU payment form
//       const paymentForm = document.createElement('form')
//       paymentForm.method = 'post'
//       paymentForm.action = 'https://secure.payu.in/_payment'
      
//       // Add all form data as hidden inputs
//       const formDataWithHash = {
//         ...payuFormData,
//         hash: hash,
//         service_provider: 'payu_paisa'
//       }

//       Object.entries(formDataWithHash).forEach(([key, value]) => {
//         const hiddenField = document.createElement('input')
//         hiddenField.type = 'hidden'
//         hiddenField.name = key
//         hiddenField.value = value as string
//         paymentForm.appendChild(hiddenField)
//       })

//       document.body.appendChild(paymentForm)
//       paymentForm.submit()

//       return { success: true }
//     } catch (error) {
//       console.error('Complete Payment Processing Error:', error)
      
//       // More detailed error logging
//       if (error instanceof Error) {
//         console.error('Error Name:', error.name)
//         console.error('Error Message:', error.message)
//         console.error('Error Stack:', error.stack)
//       }

//       throw error
//     }
//   }

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     setIsSubmitting(true)

//     try {
//       const formData = new FormData(event.currentTarget)
//       const formValues = {
//         plan: formData.get('plan'),
//         contact: formData.get('contact'),
//         mood: formData.get('mood'),
//         occasion: formData.get('occasion'),
//         length: formData.get('length'),
//         language: formData.get('language'),
//         artist: formData.get('artist'),
//         text: formData.get('text')
//       }

//       // Detailed logging of form values
//       console.log('Form Values:', formValues)

//       // Get plan amount
//       const amount = planPrices[formValues.plan as keyof typeof planPrices] || 0
//       if (!amount) {
//         throw new Error('Invalid plan selected')
//       }

//       // First save form data
//       const formResponse = await fetch('/api/submit-form', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formValues),
//       })

//       const responseData = await formResponse.json()

//       if (!responseData.success) {
//         throw new Error(responseData.error || 'Failed to submit form')
//       }

//       // Then initiate payment
//       await processPayment(formValues, amount)
      
//       toast.success('Form submitted successfully!')
      
//       // Optional: Reset form
//       event.currentTarget.reset()
//       if (selectedPlan) {
//         const planSelect = document.getElementById('plan') as HTMLSelectElement
//         if (planSelect) {
//           planSelect.value = selectedPlan
//         }
//       }
//     } catch (error) {
//       console.error('Complete Submission Error:', error)
      
//       // More detailed error handling
//       if (error instanceof Error) {
//         console.error('Error Name:', error.name)
//         console.error('Error Message:', error.message)
//         console.error('Error Stack:', error.stack)
        
//         // More specific error messaging
//         if (error.message.includes('plan')) {
//           toast.error('Please select a valid plan.')
//         } else if (error.message.includes('form')) {
//           toast.error('Unable to save form details. Please try again.')
//         } else {
//           toast.error('Failed to process request. Please check your information and try again.')
//         }
//       } else {
//         toast.error('An unexpected error occurred. Please try again.')
//       }
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 item-center">
//       <h2 className="text-3xl font-bold item-center text-gray-800 mb-6">Customize Your Song</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Plan Selection */}
//         <div>
//           <label htmlFor="plan" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//             <Music className="h-4 w-4 mr-1" /> Select Plan
//           </label>
//           <select
//             id="plan"
//             name="plan"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
//             required
//             defaultValue={selectedPlan || ""}
//           >
//             <option value="">Select a Plan</option>
//             <option value="basic">Basic Plan ( ₹999 )</option>
//             <option value="enhanced">Enhanced Plan ( ₹1999 )</option>
//             <option value="premium">Premium Plan ( ₹2999 )</option>
//             <option value="my">my Plan ( ₹9 )</option>
//             <option value="other">other</option>
//           </select>
//         </div>
        
//         {/* Contact Number */}
//         <div>
//           <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
//             Contact Number
//           </label>
//           <div className="relative">
//             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
//               +91
//             </span>
//             <input
//               type="tel"
//               id="contact"
//               name="contact"
//               className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
//               pattern="[0-9]{10}"
//               maxLength={10}
//               placeholder="Enter 10-digit number"
//               title="Please enter a valid 10-digit phone number"
//               required
//             />
//           </div>
//         </div>
//         <div>
//           <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//             <Music className="h-4 w-4 mr-1" /> Choose Mood
//           </label>
//           <select
//             id="mood"
//             name="mood"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
//             required
//           >
//             <option value="">Select a mood</option>
//             <option value="romantic">Romantic</option>
//             <option value="joyful">Joyful</option>
//             <option value="emotional">Emotional</option>
//             <option value="other">other</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//             <Calendar className="h-4 w-4 mr-1" /> Select Occasion
//           </label>
//           <select
//             id="occasion"
//             name="occasion"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
//             required
//           >
//             <option value="">Select an occasion</option>
//             <option value="valentine">Valentine</option>
//             <option value="proposal">Proposal</option>
//             <option value="anniversary">Anniversary</option>
//             <option value="wedding">Wedding</option>
//             <option value="birthday">Birthday</option>
            
//           </select>
//         </div>

//         <div>
//           <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//             <Clock className="h-4 w-4 mr-1" /> Length of the Song
//           </label>
//           <select
//             id="length"
//             name="length"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
//             required
//           >
//             <option value="">Select song length</option>
//             <option value="2">1-2 minutes</option>
//             <option value="5">2-3 minutes</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//             <Globe className="h-4 w-4 mr-1" /> Language of the Song
//           </label>
//           <select
//             id="language"
//             name="language"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
//             required
//           >
//             <option value="">Select language</option>
//             <option value="english">English</option>
//             <option value="hindi">Hindi</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="artist" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//             <Mic className="h-4 w-4 mr-1" /> Preferred Artist
//           </label>
//           <select
//             id="artist"
//             name="artist"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
//             required
//           >
//             <option value="">Select preferred artist</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
//             Mention who is the song to and who is the song from
//           </label>
//           <input
//             type="text"
//             id="text"
//             name="text"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F94D8F]"
//             placeholder="This song is for my wife Neha!!"
//             required
//           />
//         </div>

        
//         {/* Submit Button */}
//         <div className="mt-6">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full bg-[#F94D8F] text-white py-3 rounded-md hover:bg-[#E43D7F] transition-colors ${
//               isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//           >
//             {isSubmitting ? 'Processing...' : 'Pay Now'}
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }
