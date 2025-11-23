'use client';

import { useState, FormEvent } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { TabsContent } from '@/components/ui/tabs';
import { Tabs } from '@radix-ui/react-tabs';
import DestinationCard from '@/components/home/destination-card';
import trav from '@/public/trav.webp'

interface Location {
  name: string;
  image: string;
  description: string;
  matchReason: string;
  highlights: string[];
}

export default function DreamMapper() {
    const [recommendedDestinations, setRecommendedDestinations] = useState<
  Array<{
    id: string;
    name: string;
    country: string;
    description: string;
    image: string;
    cost: string;
    weather: string;
    activities: string[];
    bestFor: string;
    rating: number;
    facts: string[];
    tags: string[];
  }>
>([]);
  const [dreamDescription, setDreamDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDreamSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/match-dream', {
        dream: dreamDescription,
      });
  
      // Ensure the response contains the "matches" array
      if (response.data && Array.isArray(response.data.matches)) {
        setRecommendedDestinations(response.data.matches);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to interpret dream');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-40">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-900 mb-4">Dream to Destination</h1>
        <p className="text-gray-600">
          Describe your dream and let us find real-world places that match its essence
        </p>
      </div>

      <form onSubmit={handleDreamSubmit} className="mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <textarea
            value={dreamDescription}
            onChange={(e) => setDreamDescription(e.target.value)}
            placeholder="Describe your dream... (e.g., I was walking through red mountains with music echoing from caves...)"
            className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-4 py-3 px-6 rounded-lg text-white font-medium transition-all
              ${isLoading ? 'bg-indigo-400' : 'bg-indigo-500 hover:bg-indigo-600 active:scale-98'}`}
          >
            {isLoading ? 'Interpreting Dream...' : 'Find Matching Destinations'}
          </button>
        </div>
      </form>

      {error && (
        <div className="text-red-500 text-center mb-6">
          {error}
        </div>
      )}
{/* 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mappedLocations.map((location, index) => (
          <motion.div
            key={location.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-xl overflow-hidden shadow-lg"
          >
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${location.image})` }}
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-indigo-900 mb-2">
                {location.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {location.description}
              </p>
              <div className="bg-indigo-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-indigo-900 mb-2">Why this matches your dream:</h4>
                <p className="text-gray-600">{location.matchReason}</p>
              </div>
              <div className="space-y-2">
                {location.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2" />
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div> */}
      <Tabs defaultValue="all" className="mb-12">
                      <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recommendedDestinations.map((destination, index) => (
                          
                          <DestinationCard
                            key={destination.id}
                            id={destination.id} // Unique ID
                            name={destination.name} // Destination name
                            description={destination.description} // Description (e.g., name + country)
                            image={trav.src} // Image URL
      
                            rating={destination.rating} // Rating (e.g., 4.5)
      
                            matchPercentage={99} // Static match percentage for now
                            index={index} country={""} tags={[]}                    />
                        ))}
                      </TabsContent>
        </Tabs>
    </div>
  );
}