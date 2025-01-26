"use client"
import { MessageCircle } from 'lucide-react'

export const WhatsAppButton = () => {
  const phoneNumber = '+918955817991' 
  const message = 'Hi! I would like to know more about AI personalized songs.' // Default message

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center gap-2"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden md:inline">Chat with us</span>
    </button>
  )
}
