import type { Metadata } from 'next'
import './globals.css'
import MetaPixel from '@/components/meta-pixel'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <MetaPixel event="InitiateCheckout" />
      {children}
    </>
  )
}
