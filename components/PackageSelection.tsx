import React from 'react'
import { PackageDetails } from './PackageDetails'
import { CustomizationForm } from './CustomizationForm'
import { FloatingElements } from './FloatingElements'

export const PackageSelection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-pink-50 to-white">
      <FloatingElements />
      <div className="container align-center px-4 z-10">
        {/* <div className="grid md:grid-cols-2 gap-8"> */}
          {/* <PackageDetails /> */}
          <CustomizationForm />
        {/* </div> */}
      </div>
    </section>
  )
}

