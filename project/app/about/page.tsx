import React from 'react';
import { Map, Users, Heart, Globe } from 'lucide-react';

export default function AboutPage() {
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
