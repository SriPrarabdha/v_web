import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Giftcart",
  description: "Privacy Policy and information usage details for Giftcart.com",
}

export default function PolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  )
}