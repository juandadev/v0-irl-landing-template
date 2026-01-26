import { HeroHeader } from '@/components/header'
import { HeroSection } from '@/components/hero-section'

export default function Home() {
  return (
    <>
      <HeroHeader />
      <main className="min-h-screen">
        <HeroSection />
      </main>
    </>
  )
}
