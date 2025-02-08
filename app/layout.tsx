import { GeistSans } from 'geist/font/sans'
import { Playfair_Display, Great_Vibes } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster as SonnerToaster } from 'sonner'
import { Toaster as UiToaster } from '@/components/ui/toaster'
import './globals.css'
import { Analytics } from '@vercel/analytics/next';
import MetaPixel from '@/components/meta-pixel'

const playfair = Playfair_Display({ subsets: ['latin'] })
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <MetaPixel event="PageView"/>
      </head>
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics mode="production" />
          <UiToaster />
          <SonnerToaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}

export { playfair, greatVibes }