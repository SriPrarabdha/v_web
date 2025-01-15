import React from 'react'
import { Package } from './Package'

export const PackageDetails: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center md:text-left">Your Package</h2>
      <Package
        title="Basic Plan"
        features={[
          "Professionally written and composed",
          "Personalized based on your story",
          "High-quality audio file",
          "Song delivery in 4 days",
        ]}
        price={999}
      />
    </div>
  )
}

