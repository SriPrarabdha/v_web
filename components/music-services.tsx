'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { playfair } from "@/app/layout"
import { Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { useState, useEffect } from "react"

const testimonials = [
  {
    name: "Kiran",
    occasion: "Anniversary Gift",
    quote: "My Boyfriend was moved to tears when he heard our story in song. Simply beautiful.",
    rating: 5
  },
  {
    name: "Khushi",
    occasion: "Anniversary Gift",
    quote: "The most unique and touching gift I've ever received. The quality was amazing!",
    rating: 5
  },
  {
    name: "Ansh",
    occasion: "Propose gift",
    quote: "The most heartfelt gift I’ve ever given—perfectly captured emotions in a beautiful song.",
    rating: 5
  },
   {
    name: "Priyanshu",
    occasion: "Propose gift",
    quote: "The song perfectly captured the emotions and feelings of when we first met—truly magical!",
    rating: 5
  }
]

export function MusicServices() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [volume, setVolume] = useState([75])

  // Add scroll into view functionality
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#testimonials') {
      const element = document.getElementById('testimonials');
      if (element) {
        // Add a slight delay to ensure smooth scrolling after page load
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <section id="testimonials" className="py-20 px-10"> {/* Changed ID to testimonials */}
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className={`${playfair.className} text-3xl font-bold sm:text-4xl md:text-5xl`}>
                Your Story, Your Melody
              </h2>
              <p className="text-muted-foreground text-lg">
                From the first &apos;hello&apos; to cherished anniversaries, we transform your love into
                timeless songs. Our professional artists craft each piece with passion and care.
              </p>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <h3 className="font-medium">{testimonials[currentTestimonial].name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[currentTestimonial].occasion}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                  </div>
                  <p className="italic">&quot;{testimonials[currentTestimonial].quote}&quot;</p>
                  <div className="pt-4 flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentTestimonial((prev) => 
                        prev === 0 ? testimonials.length - 1 : prev - 1
                      )}
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="h-12 w-12"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentTestimonial((prev) => 
                        prev === testimonials.length - 1 ? 0 : prev + 1
                      )}
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2 ml-auto">
                      <Volume2 className="h-4 w-4" />
                      <Slider
                        value={volume}
                        onValueChange={setVolume}
                        max={100}
                        step={1}
                        className="w-24"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button size="lg" className="w-full sm:w-auto">
              Create Your Song
            </Button>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
            <div className="absolute inset-0 flex items-center justify-center">
              <Button size="lg" variant="outline" className="text-white border-white">
                Watch Recording Process
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

