'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { playfair } from "@/app/layout"
import { Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from "react"

// Enhanced Google Drive URL converter
const getGoogleDriveDirectUrl = (url: string) => {
  const fileId = url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] || url.split('/d/')[1]?.split('/')[0]
  return fileId ? `https://drive.google.com/uc?export=download&id=${fileId}` : url
}

const testimonials = [
  {
    name: "Kiran",
    occasion: "Anniversary Gift",
    quote: "My Boyfriend was moved to tears when he heard our story in song. Simply beautiful.",
    rating: 5,
    audioUrl: "https://drive.google.com/file/d/1LKEnRB8dEbFqGJGujlzVruEvjIF0z4ZQ/view?usp=sharing"
  },
  {
    name: "Khushi",
    occasion: "Anniversary Gift",
    quote: "The most unique and touching gift I've ever received. The quality was amazing!",
    rating: 5,
    audioUrl: "https://drive.google.com/file/d/1_D9fsRBNDfDygZ_qmObsvmHcYf632Joe/view?usp=sharing"
  },
  {
    name: "Ansh",
    occasion: "Propose gift",
    quote: "The most heartfelt gift I've ever given—perfectly captured emotions in a beautiful song.",
    rating: 5,
    audioUrl: "https://drive.google.com/file/d/1LKEnRB8dEbFqGJGujlzVruEvjIF0z4ZQ/view?usp=sharing"
  },
  {
    name: "Priyanshu",
    occasion: "Propose gift",
    quote: "The song perfectly captured the emotions and feelings of when we first met—truly magical!",
    rating: 5,
    audioUrl: "https://drive.google.com/file/d/1_D9fsRBNDfDygZ_qmObsvmHcYf632Joe/view?usp=sharing"
  }
]

export function MusicServices() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [volume, setVolume] = useState([75])
  const videoRef = useRef<HTMLIFrameElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [hasIntersected, setHasIntersected] = useState(false)

  // Handle audio source changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.load()
      setIsPlaying(false)
      
      const handleError = () => {
        console.error("Error loading audio")
        setIsPlaying(false)
      }
      
      audioRef.current.addEventListener('error', handleError)
      return () => audioRef.current?.removeEventListener('error', handleError)
    }
  }, [currentTestimonial])

  const handleTestimonialChange = useCallback((direction: 'next' | 'prev') => {
    setCurrentTestimonial((prev) => {
      return direction === 'next' 
        ? (prev === testimonials.length - 1 ? 0 : prev + 1)
        : (prev === 0 ? testimonials.length - 1 : prev - 1)
    })
  }, [])

  // Enhanced play/pause with error handling
  const togglePlayPause = () => {
    if (!audioRef.current) return
    
    try {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(error => {
          console.error("Playback failed:", error)
          setIsPlaying(false)
        })
      }
      setIsPlaying(!isPlaying)
    } catch (error) {
      console.error("Playback error:", error)
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100
    }
  }, [volume])

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  const handleScrollToHampers = () => {
    const hamperSection = document.getElementById('hampers')
    hamperSection?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const hash = window.location.hash
    if (hash === '#testimonials') {
      const element = document.getElementById('testimonials')
      element?.scrollIntoView({ behavior: 'smooth' })
    }

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && !hasIntersected && setHasIntersected(true),
      { threshold: 0.5 }
    )

    const videoSection = document.getElementById('video-section')
    if (videoSection) observer.observe(videoSection)

    return () => {
      if (videoSection) observer.unobserve(videoSection)
    }
  }, [hasIntersected])

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-pink-50 px-4 md:px-6 mx-auto">
      <div className="container mx-auto">
        <audio
          ref={audioRef}
          key={currentTestimonial}
          onEnded={handleAudioEnded}
          onError={() => console.error("Audio loading error")}
        >
          <source
            src={getGoogleDriveDirectUrl(testimonials[currentTestimonial].audioUrl)}
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>

        <div className="grid gap-8 lg:grid-cols-2 items-center max-w-[1200px] mx-auto">
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
                      {Array.from({ length: 5 }).map((_, i) => (
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
            <Button 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={handleScrollToHampers}
            >
              Create Your Song
            </Button>
          </div>
          <div id="video-section" className="relative md:aspect-video aspect-[9/16] rounded-lg overflow-hidden shadow-xl h-[500px] md:h-auto mx-auto w-full max-w-[350px] md:max-w-none">
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