export const FB_PIXEL_ID = '600765036158424'

// Tracks a page view
export const pageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView')
  }
}

// Tracks a specific event
export const event = (name: string, options = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, options)
  }
}

// TypeScript support for fbq
declare global {
  interface Window {
    fbq: (
      type: string,
      eventName: string,
      options?: Record<string, any>
    ) => void;
    _fbq: any;
  }
}