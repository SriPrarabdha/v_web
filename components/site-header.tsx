// 'use client'

import { AnimatedLogo } from "@/components/animated-logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import Link from "next/link"

const navigation = [
  { name: "How It Works", href: "#how-it-works" },
  { name: "Hampers", href: "#hampers" },
  { name: "Music Services", href: "#music-services" },
  { name: "Testimonials", href: "#testimonials" },
]

export function SiteHeader() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState({}, '', href);
      }
    }
  };

  return (
    <header className="fixed w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 shadow-sm">
      <div className="container flex flex-col">
        <AnimatedLogo />
        <div className="flex h-16 items-center justify-between py-4">
          <nav className="hidden md:flex gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleNavClick}
                className="relative text-sm font-medium transition-colors hover:text-primary group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-6">
            <Button 
              asChild
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2 transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/checkout">
                Start Your Story
              </Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="md:hidden hover:bg-primary/10 transition-colors"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col gap-6 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={handleNavClick}
                      className="text-lg font-medium transition-all duration-300 hover:text-primary hover:translate-x-2 flex items-center"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button 
                    asChild
                    className="mt-4 bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2 transition-all duration-300 transform hover:scale-105"
                  >
                    <Link href="/checkout">
                      Start Your Story
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}