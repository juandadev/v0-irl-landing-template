import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CalendarDays, MapPin } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-foreground/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-1/2 left-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-t from-foreground/3 to-transparent blur-3xl" />
      </div>

      <div className="relative pb-24 pt-32 md:pb-32 md:pt-40 lg:pb-40 lg:pt-48">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            {/* Event badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/50 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
              </span>
              <span className="font-mono">Prompt to Production</span>
            </div>

            {/* Main heading */}
            <h1 className="text-balance text-5xl font-medium tracking-tight md:text-6xl lg:text-7xl">
              v0 IRL
            </h1>
            
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground md:text-xl">
              v0 is getting ready to launch its biggest product update yet. 
              We&apos;re celebrating with v0 IRLs around the world.
            </p>

            {/* Event details */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground sm:flex-row sm:gap-8">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span className="font-mono">Thursday, February 5th, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="font-mono">NYC</span>
              </div>
            </div>

            {/* Tagline */}
            <p className="mt-10 text-balance text-lg font-medium text-foreground/80">
              One week. Global hackathons. Real apps, real work.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-foreground px-8 text-base text-background hover:bg-foreground/90"
              >
                <Link href="https://v0.app/irl">
                  <span className="text-nowrap">Register Now</span>
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border/50 px-8 text-base hover:bg-secondary/50 bg-transparent"
              >
                <Link
                  href="https://meetup-sdk.vercel.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-nowrap">Host an Event</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
