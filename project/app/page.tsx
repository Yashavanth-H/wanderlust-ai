import { Suspense } from 'react'
import HeroSection from '@/components/home/hero-section'
import Preferences from '@/components/preferences/preferences'
import DestinationsSection from '@/components/home/destinations-section'
import HowItWorks from '@/components/home/how-it-works'
import FeaturesSection from '@/components/home/features-section'
import Testimonials from '@/components/home/testimonials'

export default function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Preferences />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <DestinationsSection />
      </Suspense>
      
      <Suspense fallback={<div>Loading...</div>}>
        <HowItWorks />
      </Suspense>
      
      <Suspense fallback={<div>Loading...</div>}>
        <FeaturesSection />
      </Suspense>
      
      <Suspense fallback={<div>Loading...</div>}>
        <Testimonials />
      </Suspense>
    </>
  )
}