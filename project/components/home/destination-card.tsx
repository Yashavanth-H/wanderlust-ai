import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, MapPin, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DestinationProps {
  id: string
  name: string
  country: string
  image: string
  rating: number
  tags: string[]
  matchPercentage: number
  description: string
  index?: number
}

const DestinationCard = ({
  name,
  country,
  image,
  rating,
  tags,
  matchPercentage,
  description,
  index = 0
}: DestinationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-card rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={`${name}, ${country}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/60" />
        
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <Badge 
            variant="secondary" 
            className={cn(
              "font-semibold text-white",
              matchPercentage >= 90 ? "bg-green-500" : 
              matchPercentage >= 80 ? "bg-green-400" : 
              matchPercentage >= 70 ? "bg-blue-500" : 
              "bg-blue-400"
            )}
          >
            {matchPercentage}% Match
          </Badge>
          
          <Button variant="outline" size="icon" className="bg-white/20 backdrop-blur-sm border-0 text-white hover:bg-white/30 h-8 w-8">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Save destination</span>
          </Button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-playfair text-xl font-bold">{name}</h3>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="text-sm">{country}</span>
            </div>
          </div>
          
          <div className="flex items-center bg-muted/50 px-2 py-1 rounded">
            <Star className="h-3 w-3 text-yellow-500 mr-1 fill-yellow-500" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-muted/50">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Button className="w-full">View Details</Button>
      </div>
    </motion.div>
  )
}

export default DestinationCard