import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <Card className="w-full max-w-4xl mx-auto shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <CardTitle className="text-4xl font-bold text-center">About Wanderlust AI</CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6 text-gray-800 dark:text-gray-200">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p>
              Wanderlust AI helps travelers discover hidden gems across India by leveraging AI‑driven recommendations, real‑time data, and beautiful visual storytelling. We aim to turn every trip into a memorable adventure.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Personalized destination suggestions based on your preferences.</li>
              <li>Interactive dream‑matcher that aligns your travel dreams with real locations.</li>
              <li>Seamless integration with popular travel APIs (Amadeus, Geoapify, OpenTripMap).</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Team</h2>
            <p>Built by passionate developers and travel enthusiasts. Want to contribute? Check out our <a href="https://github.com/Yashavanth-H/wanderlust-ai" className="text-indigo-600 hover:underline">GitHub repository</a>.
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );


  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-8">About Wanderlust AI</h1>

        <p className="text-xl text-center text-muted-foreground mb-16 leading-relaxed">
          We believe that travel is not just about going places—it's about discovering yourself in new surroundings.
          Our mission is to use artificial intelligence to match you with destinations that resonate with your soul.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-card p-8 rounded-2xl shadow-sm border">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Story</h3>
            <p className="text-muted-foreground">
              Born from a hackathon project, Wanderlust AI was created by a team of passionate travelers and developers
              who wanted to solve the "analysis paralysis" of choosing a vacation spot. We realized that traditional
              search filters don't capture the *feeling* of a place.
            </p>
          </div>

          <div className="bg-card p-8 rounded-2xl shadow-sm border">
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6">
              <Heart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Philosophy</h3>
            <p className="text-muted-foreground">
              We don't just look at prices and weather. We analyze the vibe, the culture, and the unique experiences
              that make a destination special. By understanding your "travel dreams," we can find matches that
              traditional booking sites miss.
            </p>
          </div>
        </div>

        <div className="text-center bg-muted/30 rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-white dark:bg-background rounded-full shadow-md flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-bold text-lg mb-2">Describe Your Dream</h4>
              <p className="text-sm text-muted-foreground">Tell us about your ideal trip in plain English.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-white dark:bg-background rounded-full shadow-md flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="font-bold text-lg mb-2">AI Analysis</h4>
              <p className="text-sm text-muted-foreground">Our algorithms match your description with thousands of spots.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-white dark:bg-background rounded-full shadow-md flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="font-bold text-lg mb-2">Get Inspired</h4>
              <p className="text-sm text-muted-foreground">Discover destinations you might never have considered.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
