'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Smarter Travel Planning with Advanced AI</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Our AI doesn't just match keywords—it understands the essence of what makes travel experiences meaningful for you.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-lg">Personalized Recommendations</h3>
                  <p className="text-muted-foreground">Our AI analyzes your preferences, budget, and travel style to suggest destinations uniquely suited to you.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-lg">Hidden Gem Discovery</h3>
                  <p className="text-muted-foreground">Beyond popular tourist spots, we uncover lesser-known destinations that match your interests.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-lg">Smart Itinerary Builder</h3>
                  <p className="text-muted-foreground">Generate customized day-by-day itineraries that optimize your time and match your travel pace.</p>
                </div>
              </div>
            </div>
            
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Explore Features
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="aspect-w-4 aspect-h-3">
                <Image
                  src="https://images.pexels.com/photos/7412069/pexels-photo-7412069.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="AI Travel Planning"
                  width={800}
                  height={600}
                  className="object-cover"
                />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="text-white">
                  <h3 className="font-playfair text-xl font-semibold mb-2">AI-Powered Travel Assistant</h3>
                  <p className="text-white/80 text-sm">
                    Get 24/7 recommendations and answers to all your travel questions
                  </p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg transform rotate-3">
              <span className="font-medium">New Feature!</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection