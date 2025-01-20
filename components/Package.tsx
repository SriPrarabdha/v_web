import React from 'react'
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PackageProps {
  title: string
  features: string[]
  price: number
  planId: string
}

export const Package: React.FC<PackageProps> = ({ title, features, price, planId }) => {
  const router = useRouter()

  const handlePlanSelection = () => {
    router.push(`/checkout?plan=${planId}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-600">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-800">₹{price.toLocaleString()}</span>
        <button 
          onClick={handlePlanSelection}
          className="bg-[#F94D8F] text-white px-4 py-2 rounded-full hover:bg-[#E43D7F] transition-colors"
        >
          Choose Plan
        </button>
      </div>
    </div>
  )
}
