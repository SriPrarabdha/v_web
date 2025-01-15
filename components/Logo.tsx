import React from 'react'

export const Logo: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center py-16 overflow-hidden">
      <div className="relative z-10 animate-float-medium">
        <svg width="300" height="100" viewBox="0 0 300 100" className="fill-current text-[#F94D8F]">
          <defs>
            <path id="curve" d="M10 80 Q150 20 290 80" />
          </defs>
          <text className="font-script text-4xl">
            <textPath xlinkHref="#curve" startOffset="50%" textAnchor="middle">
              Melodious
            </textPath>
          </text>
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1 w-64 h-0.5 bg-[#F94D8F] opacity-50"></div>
      </div>
      <div className="mt-2 relative z-10 animate-float-slow">
        <span className="uppercase tracking-[0.5em] text-sm text-gray-600 font-light">Memories</span>
        <svg className="absolute -top-3 -left-4 text-[#F94D8F] opacity-50 animate-pulse" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L13.4328 8.82843L18 10.2612L13.4328 11.6941L12 16.5225L10.5672 11.6941L6 10.2612L10.5672 8.82843L12 4Z" fill="currentColor"/>
        </svg>
        <svg className="absolute -bottom-3 -right-4 text-[#F94D8F] opacity-50 animate-pulse" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L13.4328 8.82843L18 10.2612L13.4328 11.6941L12 16.5225L10.5672 11.6941L6 10.2612L10.5672 8.82843L12 4Z" fill="currentColor"/>
        </svg>
      </div>
      {/* Floating musical notes and hearts */}
      <div className="absolute inset-0 z-0">
        <svg className="w-8 h-8 absolute left-1/4 top-1/4 text-[#F94D8F] opacity-30 animate-float-slow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 18V5l12-2v13H9zm0 0v4l12 2v-4H9zm-2 0H5V5l2-.333V18zm0 0v4l-2 .333v-4h2z"/>
        </svg>
        <svg className="w-6 h-6 absolute right-1/4 top-1/3 text-[#F94D8F] opacity-20 animate-float-medium" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 18V5l12-2v13H9zm0 0v4l12 2v-4H9zm-2 0H5V5l2-.333V18zm0 0v4l-2 .333v-4h2z"/>
        </svg>
        <svg className="w-5 h-5 absolute left-1/3 bottom-1/4 text-[#F94D8F] opacity-25 animate-float-fast" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 18V5l12-2v13H9zm0 0v4l12 2v-4H9zm-2 0H5V5l2-.333V18zm0 0v4l-2 .333v-4h2z"/>
        </svg>
        <svg className="w-6 h-6 absolute right-1/3 bottom-1/3 text-[#F94D8F] opacity-20 animate-float-medium" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <svg className="w-4 h-4 absolute left-1/5 top-1/3 text-[#F94D8F] opacity-30 animate-float-fast" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-100 to-white opacity-30 animate-pulse"></div>
    </div>
  )
}

