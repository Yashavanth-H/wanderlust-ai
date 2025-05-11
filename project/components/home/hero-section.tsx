"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Search, CalendarIcon, Users, DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'



const HeroSection = () => {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [budget, setBudget] = useState([1000])
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <div className="  relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:60px_60px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolut inset-0 bg-cover bg-center z-0" 
        // style={{ 
        //   backgroundImage: "url('https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        //   backgroundPosition: "center center"
        // }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0  z-10" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 text-black">
        <div className="max-w-4xl mx-auto text-center mb-4">
          <motion.h1 
            className="antialiased font-playfair text-4xl md:text-5xl lg:text-6xl font-bold  leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            
            Discover Your Perfect <span className='text-blue-600'>Destination </span> with AI
          </motion.h1>
          
          <motion.p 
            className=" antialiased text-lg md:text-lg opacity-90 pt-6 pb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Tell us what you love, and our AI will recommend the perfect destinations tailored just for you.
            
          </motion.p>
        </div>
        
        <motion.div 
          className="flex flex-col justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Link href="/dream-matcher" passHref>
            <Button 
              size="lg" 
              className="antialiased rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-6 text-lg transition-all duration-200 transform hover:scale-[1.01]"
            >
              <Search className="mr-2 h-4 w-4" /> Find My Perfect Destination
            </Button>
            </Link>
        </motion.div>
      </div>
      
      {/* Scrolldown indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-white text-sm mb-2">Scroll to explore</span>
          <motion.div 
            className="w-1 h-8 bg-white/50 rounded-full"
            animate={{ 
              y: [0, 10, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5 
            }}
          />
        </div>
      </motion.div>
    </section>
    </div>
  )
}

export default HeroSection