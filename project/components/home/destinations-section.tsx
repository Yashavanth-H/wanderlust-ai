'use client'

import { motion } from 'framer-motion'
import DestinationCard, { DestinationProps } from './destination-card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const destinationsData: DestinationProps[] = [
  {
    id: '1',
    name: 'Kyoto',
    country: 'Japan',
    image: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 4.8,
    tags: ['Cultural', 'Historical', 'Temples'],
    matchPercentage: 94,
    description: 'Experience the ancient traditions and breathtaking temples of Japan\'s cultural heart, with stunning gardens and geisha districts.'
  },
  {
    id: '2',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 4.7,
    tags: ['Beach', 'Romantic', 'Views'],
    matchPercentage: 92,
    description: 'Iconic whitewashed buildings with blue domes overlooking the Aegean Sea. Perfect for stunning sunsets and romantic getaways.'
  },
  {
    id: '3',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.pexels.com/photos/2474689/pexels-photo-2474689.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 4.5,
    tags: ['Beach', 'Culture', 'Adventure'],
    matchPercentage: 88,
    description: 'Discover lush rice terraces, sacred temples, vibrant coral reefs and a unique blend of relaxation and adventure.'
  },
  {
    id: '4',
    name: 'Amalfi Coast',
    country: 'Italy',
    image: 'https://images.pexels.com/photos/2512282/pexels-photo-2512282.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 4.9,
    tags: ['Coastal', 'Food', 'Scenic'],
    matchPercentage: 86,
    description: 'A breathtaking coastline with colorful cliffside villages, Mediterranean beaches, and world-class Italian cuisine.'
  },
  {
    id: '5',
    name: 'Marrakech',
    country: 'Morocco',
    image: 'https://images.pexels.com/photos/4502965/pexels-photo-4502965.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 4.6,
    tags: ['Cultural', 'Market', 'Architecture'],
    matchPercentage: 81,
    description: 'Explore bustling souks, ornate palaces, and lush gardens in this vibrant city where tradition meets modern luxury.'
  },
  {
    id: '6',
    name: 'Banff',
    country: 'Canada',
    image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1200',
    rating: 4.7,
    tags: ['Mountains', 'Nature', 'Adventure'],
    matchPercentage: 79,
    description: 'Stunning mountain landscapes with turquoise lakes, abundant wildlife, and year-round outdoor activities.'
  }
]

const DestinationsSection = () => {
  return (
    <section id="destinations" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">AI-Recommended Destinations</h2>
          <p className="text-muted-foreground text-lg">
            Personalized recommendations based on your preferences, powered by advanced AI.
          </p>
        </motion.div>
        
        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="mx-auto flex justify-center mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="beach">Beach</TabsTrigger>
            <TabsTrigger value="cultural">Cultural</TabsTrigger>
            <TabsTrigger value="adventure">Adventure</TabsTrigger>
            <TabsTrigger value="food">Food & Wine</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinationsData.map((destination, index) => (
              <DestinationCard 
                key={destination.id} 
                {...destination} 
                index={index}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="beach" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinationsData
              .filter(d => d.tags.includes('Beach'))
              .map((destination, index) => (
                <DestinationCard 
                  key={destination.id} 
                  {...destination} 
                  index={index}
                />
              ))}
          </TabsContent>
          
          <TabsContent value="cultural" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinationsData
              .filter(d => d.tags.includes('Cultural'))
              .map((destination, index) => (
                <DestinationCard 
                  key={destination.id} 
                  {...destination} 
                  index={index}
                />
              ))}
          </TabsContent>
          
          <TabsContent value="adventure" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinationsData
              .filter(d => d.tags.includes('Adventure'))
              .map((destination, index) => (
                <DestinationCard 
                  key={destination.id} 
                  {...destination} 
                  index={index}
                />
              ))}
          </TabsContent>
          
          <TabsContent value="food" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground mb-4">No food & wine destinations match your current filters.</p>
              <Button variant="outline">Adjust your preferences</Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Destinations
          </Button>
        </div> */}
      </div>
    </section>
  )
}

export default DestinationsSection