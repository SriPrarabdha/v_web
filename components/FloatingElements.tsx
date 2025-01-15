import React from 'react'
import { Music, Heart, Gift } from 'lucide-react'

export const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Music className="absolute text-[#F94D8F] opacity-20 w-8 h-8 animate-float-slow left-1/4 top-1/4" />
      <Music className="absolute text-[#F94D8F] opacity-20 w-6 h-6 animate-float-medium right-1/4 top-1/3" />
      <Heart className="absolute text-[#F94D8F] opacity-20 w-8 h-8 animate-float-medium left-1/3 bottom-1/4" />
      <Heart className="absolute text-[#F94D8F] opacity-20 w-6 h-6 animate-float-fast right-1/3 top-1/4" />
      <Gift className="absolute text-[#F94D8F] opacity-20 w-8 h-8 animate-float-slow left-1/5 bottom-1/3" />
      <Gift className="absolute text-[#F94D8F] opacity-20 w-6 h-6 animate-float-medium right-1/5 top-1/3" />
    </div>
  )
}

