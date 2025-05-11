'use client'

import { motion } from 'framer-motion'
import { Brain, Filter, Map, Sparkles } from 'lucide-react'

const howItWorksItems = [
  {
    icon: <Filter className="h-10 w-10 text-blue-500" />,
    title: "Share Your Preferences",
    description: "Tell us what you're looking for in a destination. From beach vibes to cultural immersion, we analyze your preferences."
  },
  {
    icon: <Brain className="h-10 w-10 text-blue-500" />,
    title: "AI Analysis",
    description: "Our advanced AI analyzes thousands of destinations, considering factors like weather, local attractions, and cultural experiences."
  },
  {
    icon: <Map className="h-10 w-10 text-blue-500" />,
    title: "Personalized Recommendations",
    description: "Receive a curated list of destinations perfectly matched to your preferences, complete with match percentages."
  },
  {
    icon: <Sparkles className="h-10 w-10 text-blue-500" />,
    title: "Discover & Explore",
    description: "Explore detailed information about each destination, including insider tips and personalized itineraries."
  }
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">How Our AI Finds Your Perfect Match</h2>
          <p className="text-muted-foreground text-lg">
            Our sophisticated AI travel assistant analyzes your preferences and matches them with thousands of destinations to find your perfect travel experience.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorksItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="relative mt-20 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 opacity-90" />
          <div className="relative z-10 py-16 px-8 text-white text-center">
            <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-4">Ready to Find Your Dream Destination?</h3>
            <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
              Let our AI analyze your travel preferences and discover destinations you'll love.
            </p>
            <motion.button 
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Start My Journey
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks