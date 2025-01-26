'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { playfair } from "@/app/layout"
import { Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from "react"

const testimonials = [
  {
    name: "Kiran",
    occasion: "Anniversary Gift",
    quote: "My Boyfriend was moved to tears when he heard our story in song. Simply beautiful.",
    rating: 5,
    audioUrl: "https://jmp.sh/s/yop8gx0t5ANYWExpbaUU"
  },
  {
    name: "Khushi",
    occasion: "Anniversary Gift",
    quote: "The most unique and touching gift I've ever received. The quality was amazing!",
    rating: 5,
    audioUrl: "https://jmp.sh/s/37mXutC3r7wLhw5dh8je"
  },
  {
    name: "Ansh",
    occasion: "Propose gift",
    quote: "The most heartfelt gift I've ever given—perfectly captured emotions in a beautiful song.",
    rating: 5,
    audioUrl: "https://jmp.sh/s/gx9Gc1kzryAn33MlnzrJ"
  },
  {
    name: "Priyanshu",
    occasion: "Propose gift",
    quote: "The song perfectly captured the emotions and feelings of when we first met—truly magical!",
    rating: 5,
    audioUrl: "https://jmp.sh/s/gx9Gc1kzryAn55MlnzrJ"
  }
]

export function MusicServices() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [volume, setVolume] = useState([75])
  const videoRef = useRef<HTMLIFrameElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [hasIntersected, setHasIntersected] = useState(false)

  const handleTestimonialChange = useCallback((direction: 'next' | 'prev') => {
    // Stop current audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Change testimonial
    setCurrentTestimonial((prev) => {
      if (direction === 'next') {
        return prev === testimonials.length - 1 ? 0 : prev + 1
      } else {
        return prev === 0 ? testimonials.length - 1 : prev - 1
      }
    })

    // Reset play state
    setIsPlaying(false)
  }, [])

  // Handle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Handle volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100
    }
  }, [volume])

  // Audio ended handler
  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  useEffect(() => {
    const hash = window.location.hash
    if (hash === '#testimonials') {
      const element = document.getElementById('testimonials')
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      { threshold: 0.5 }
    )

    const videoSection = document.getElementById('video-section')
    if (videoSection) {
      observer.observe(videoSection)
    }

    return () => {
      if (videoSection) {
        observer.unobserve(videoSection)
      }
    }
  }, [hasIntersected])

  return (
    <section id="testimonials" className="py-20 px-10">
      {/* Hidden audio element */}
      <audio 
        ref={audioRef}
        src={testimonials[currentTestimonial].audioUrl}
        onEnded={handleAudioEnded}
      />
      
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
                      onClick={() => handleTestimonialChange('prev')}
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="h-12 w-12"
                      onClick={togglePlayPause}
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
                      onClick={() => handleTestimonialChange('next')}
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2 ml-auto">
                      <Volume2 className="h-4 w-4" />
                      <Slider
                        className="w-24"
                        value={volume}
                        onValueChange={setVolume}
                        max={100}
                        step={1}
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
          <div id="video-section" className="relative md:aspect-video aspect-[9/16] rounded-lg overflow-hidden shadow-xl h-[500px] md:h-auto">
            <iframe
              ref={videoRef}
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/O-scrKcyHnE?autoplay=${hasIntersected ? '1' : '0'}&mute=0&controls=1&rel=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}