"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  Umbrella,
  Sun,
  Cloud,
  Coffee,
  Map,
  DollarSign,
  Heart,
  X,
  Camera,
  Utensils,
  Music,
  Plane,
} from "lucide-react";



import DestinationCard from "../home/destination-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Destinations data

// Main component
export default function Preferences() {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({
    budget: null,
    weather: null,
    activities: [],
    travelStyle: null,
  });
  const [recommendedDestinations, setRecommendedDestinations] = useState<
    Array<{
      id: string;
      name: string;
      country:string,
      description: string;
      image: string;
      cost: string;
      weather: string;
      activities: string[];
      bestFor: string;
      rating: number;
      facts: string[];
      tags:string[]
    }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [comparison, setComparison] = useState(false);

  // Preferences data
  const budgetOptions = [
    { value: "low", label: "Budget Friendly", icon: <DollarSign size={24} /> },
    { value: "medium", label: "Mid-Range", icon: <DollarSign size={24} /> },
    { value: "high", label: "Luxury", icon: <DollarSign size={24} /> },
  ];

  const weatherOptions = [
    { value: "warm", label: "Warm & Sunny", icon: <Sun size={24} /> },
    { value: "moderate", label: "Moderate", icon: <Umbrella size={24} /> },
    { value: "cold", label: "Cool & Crisp", icon: <Cloud size={24} /> },
  ];

  const activityOptions = [
    { value: "beach", label: "Beaches", icon: <Umbrella size={24} /> },
    { value: "adventure", label: "Adventure", icon: <Map size={24} /> },
    { value: "culture", label: "Cultural", icon: <Coffee size={24} /> },
    { value: "food", label: "Cuisine", icon: <Utensils size={24} /> },
    { value: "nightlife", label: "Nightlife", icon: <Music size={24} /> },
    { value: "sightseeing", label: "Sightseeing", icon: <Camera size={24} /> },
  ];

  const travelStyleOptions = [
    { value: "relaxed", label: "Relaxed & Easy" },
    { value: "balanced", label: "Balanced Mix" },
    { value: "packed", label: "Action Packed" },
  ];

  // Handle preferences selection
  const handleSelect = (category: string, value: string) => {
    if (category === "activities") {
      setPreferences((prev) => {
        const activities = [...prev.activities];
        const index = activities.indexOf(value as never);

        if (index === -1) {
          // Add if not already selected (max 3)
          if (activities.length < 3) {
            activities.push(value as never);
          }
        } else {
          // Remove if already selected
          activities.splice(index, 1);
        }

        return { ...prev, activities };
      });
    } else {
      setPreferences((prev) => ({ ...prev, [category]: value }));
    }
  };

  // Get recommendations
  const getRecommendations = async () => {
    setLoading(true);

    try {
      // Map our UI preferences to the backend expected format
      const backendPreferences = {
        budget: preferences.budget || "", // Empty string instead of null
        weather: preferences.weather ? [preferences.weather] : [], // Empty array instead of null
        activities: preferences.activities || [], // Ensure it's an array
        group_type: preferences.travelStyle || "", // Empty string instead of null
        season: "", // Empty string instead of null
      };

      console.log("Sending to backend:", backendPreferences); // Debug log

      const response = await fetch("http://localhost:8000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backendPreferences),
      });
      console.log("Response status:", response.status, response.statusText); // Log status

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Server error (${response.status}):`, errorText);
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data); // Log the actual response data

      if (data.status === "success" && Array.isArray(data.recommendations)) {
        // Transform the backend data to match our frontend destination format
        const formattedDestinations = data.recommendations.map(
          (dest: {
            id?: string;
            name: string;
            country: string;
            image?: string;
            avg_budget: string;
            weather: string[];
            activities?: string[];
            travel_with?: string[];
            best_season?: string[];
          }) => ({
            id: dest.id ? parseInt(dest.id, 10) : Math.floor(Math.random() * 1000000),
            name: dest.name,
            description: `${dest.name}, ${dest.country}`,
            image:
              dest.image ||
              "https://images.unsplash.com/photo-1500835556837-99ac94a94552",
            cost: dest.avg_budget,
            weather:
              Array.isArray(dest.weather) && dest.weather.length > 0
                ? dest.weather[0]
                : "Unknown",
            activities: dest.activities || [],
            bestFor: dest.travel_with
              ? `Perfect for ${dest.travel_with.join(", ")}`
              : "Everyone",
            rating: 4.5,
            facts: [
              `Located in ${dest.country}`,
              `Best visited during ${
                Array.isArray(dest.best_season)
                  ? dest.best_season.join(", ")
                  : "any season"
              }`,
              `Popular for ${
                Array.isArray(dest.activities)
                  ? dest.activities.slice(0, 3).join(", ")
                  : "tourism"
              }`,
            ],
          })
        );

        console.log("Formatted destinations:", formattedDestinations); // Log formatted data
        setRecommendedDestinations(formattedDestinations);
      } else {
        console.error("Invalid response format:", data); // Log the invalid format
        throw new Error("Invalid response format from server");
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      alert("Failed to get recommendations. Please try again.");
    } finally {
      setLoading(false);
      setStep(5); // Move to results step regardless of success/failure
    }
  };

  // Progress bar calculation
  const progress = step === 4 ? 100 : (step / 4) * 100;

  // Handle next step
  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else if (step === 4) {
      getRecommendations();
    }
  };

  // Check if current step is complete
  const isStepComplete = () => {
    switch (step) {
      case 0:
        return true; // Intro page
      case 1:
        return preferences.budget !== null;
      case 2:
        return preferences.weather !== null;
      case 3:
        return preferences.activities.length > 0;
      case 4:
        return preferences.travelStyle !== null;
      default:
        return false;
    }
  };

  // Component for individual card selection
  const SelectionCard = ({
    item,
    selected,
    category,
    multiple = false,
  }: {
    item: {
      value: string;
      label: string;
      icon?: React.ReactNode;
    };
    selected: boolean;
    category: string;
    multiple?: boolean;
  }) => {
    const isSelected = multiple
      ? category === "activities" &&
        preferences.activities.includes(item.value as never)
      : category === "budget"
      ? preferences.budget === item.value
      : category === "weather"
      ? preferences.weather === item.value
      : category === "travelStyle"
      ? preferences.travelStyle === item.value
      : false;

    return (
      <div
        className={`bg-background rounded-xl p-6 cursor-pointer shadow-md relative overflow-hidden ${
          isSelected ? "ring-4 ring-black-400" : ""
        }`}
        onClick={() => handleSelect(category, item.value)}
      >
        {isSelected && (
          <div className="absolute top-2 right-2 bg-black-500 rounded-full p-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="text-black-500 mb-2">
            {item.icon || <Heart size={24} />}
          </div>
          <h3 className="font-bold text-lg">{item.label}</h3>
        </div>
      </div>
    );
  };

  // Render current step content
  const renderStep = () => {
    switch (step) {
      case 0: // Intro
        // ${animationClasses.fadeIn}
        return (
          <div className={`text-center `}>
            <div className="mb-8 transition-all duration-500 ease-out">
              <div className="text-black-500 mb-4">
                <Plane size={64} className="mx-auto" />
              </div>
            </div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
              Discover Your Perfect Getaway
            </h1>
            <p className="text-lg mb-8 text-gray-600">
              Answer a few quick questions and our AI will recommend
              destinations tailored just for you.
            </p>
          </div>
        );

      case 1: // Budget
        // className={animationClasses.fadeIn}
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-black-900">
              What's your budget range?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {budgetOptions.map((option, index) => (
                // className={animationClasses.fadeIn}
                <div
                  key={option.value}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <SelectionCard
                    item={option}
                    selected={preferences.budget === option.value}
                    category="budget"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 2: // Weather
        return (
          // className={animationClasses.fadeIn}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-black-900">
              What weather do you prefer?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {weatherOptions.map((option, index) => (
                // className={animationClasses.fadeIn}
                <div
                  key={option.value}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <SelectionCard
                    item={option}
                    selected={preferences.weather === option.value}
                    category="weather"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 3: // Activities
        return (
          // className={animationClasses.fadeIn}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-black-900">
              Pick up to 3 activities you enjoy
              <div className="text-sm font-normal mt-1 text-gray-500">
                {preferences.activities.length}/3 selected
              </div>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {activityOptions.map((option, index) => (
                // className={animationClasses.fadeIn}
                <div
                  key={option.value}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <SelectionCard
                    item={option}
                    selected={preferences.activities.includes(
                      option.value as never
                    )}
                    category="activities"
                    multiple={true}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 4: // Travel Style
        return (
          // className={animationClasses.fadeIn}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-black-900">
              What's your travel style?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {travelStyleOptions.map((option, index) => (
                // className={animationClasses.fadeIn}
                <div
                  key={option.value}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <SelectionCard
                    item={option}
                    selected={preferences.travelStyle === option.value}
                    category="travelStyle"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 5: // Results
        return (
          // className={`${animationClasses.fadeIn} w-full`}
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-black-900">
                Your Perfect Destinations
              </h2>
              <button
                className={`text-sm px-4 py-2 rounded-lg transition-all ${
                  comparison
                    ? "bg-blue-100 text-white"
                    : "bg-blue-600 text-white outline"
                }`}
                onClick={() => setComparison(!comparison)}
              >
                {comparison ? "Hide Comparison" : "Compare All"}
              </button>
            </div>

            {comparison ? (
              <ComparisonView destinations={recommendedDestinations} />
            ) : (
              // <DestinationCards destinations={recommendedDestinations} />
              <Tabs defaultValue="all" className="mb-12">
                <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recommendedDestinations.map((destination, index) => (
                    
                    <DestinationCard
                      key={destination.id}
                      id={destination.id} // Unique ID
                      name={destination.name} // Destination name
                      description={destination.description} // Description (e.g., name + country)
                      image={`http://localhost:3000/${destination.name.toLocaleLowerCase()}.jpg`} // Image URL

                      rating={destination.rating} // Rating (e.g., 4.5)

                      matchPercentage={99} // Static match percentage for now
                      index={index} country={""} tags={[]}                    />
                  ))}
                </TabsContent>
              </Tabs>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // Destination cards view
  // const DestinationCards = ({
  //   destinations,
  // }: {
  //   destinations: Array<{
  //     id: number;
  //     name: string;
  //     description: string;
  //     image: string;
  //     cost: string;
  //     weather: string;
  //     activities: string[];
  //     bestFor: string;
  //     rating: number;
  //     facts: string[];
  //   }>;
  // }) => {
  //   return (
  //     <div className=" bg-background grid grid-cols-1 md:grid-cols-3 gap-6">
  //       {destinations.map((destination, index) => (
  //         <div
  //           key={destination.id}
  //           // ${animationClasses.fadeIn}
  //           className={`bg-white rounded-xl overflow-hidden shadow-lg `}
  //           style={{ animationDelay: `${index * 150}ms` }}
  //         >
  //           <div className="h-48 bg-gray-300 relative">
  //             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
  //             <div className="absolute bottom-0 left-0 p-4 text-white">
  //               <h3 className="text-xl font-bold">{destination.name}</h3>
  //               <div className="flex items-center mt-1">
  //                 {[...Array(5)].map((_, i) => (
  //                   <span
  //                     key={i}
  //                     className={`text-sm ${
  //                       i < Math.floor(destination.rating)
  //                         ? "text-yellow-400"
  //                         : "text-gray-400"
  //                     }`}
  //                   >
  //                     ★
  //                   </span>
  //                 ))}
  //                 <span className="ml-1 text-sm">{destination.rating}</span>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="p-4">
  //             <p className="text-gray-600 mb-4">{destination.description}</p>
  //             <div className="mb-4">
  //               <div className="flex items-center mb-2">
  //                 <DollarSign size={16} className="text-black-500 mr-2" />
  //                 <span className="text-sm text-gray-600">
  //                   Cost: {destination.cost}
  //                 </span>
  //               </div>
  //               <div className="flex items-center mb-2">
  //                 <Sun size={16} className="text-black-500 mr-2" />
  //                 <span className="text-sm text-gray-600">
  //                   Weather: {destination.weather}
  //                 </span>
  //               </div>
  //             </div>
  //             <div className="flex flex-wrap gap-2 mb-4">
  //               {destination.activities.map((activity) => (
  //                 <span
  //                   key={activity}
  //                   className="text-xs px-2 py-1 bg-black-100 text-black-700 rounded-full"
  //                 >
  //                   {activity}
  //                 </span>
  //               ))}
  //             </div>
  //             <button className="w-full bg-black-500 text-white py-2 rounded-lg font-medium hover:scale-105 active:scale-95 transition-transform">
  //               Explore {destination.name}
  //             </button>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  // Comparison view
  const ComparisonView = ({
    destinations,
  }: {
    destinations: Array<{
      id: number;
      name: string;
      description: string;
      image: string;
      cost: string;
      weather: string;
      activities: string[];
      bestFor: string;
      rating: number;
      facts: string[];
    }>;
  }) => {
    const categories = [
      { label: "Cost", key: "cost" },
      { label: "Weather", key: "weather" },
      { label: "Best For", key: "bestFor" },
      { label: "Rating", key: "rating" },
      { label: "Activities", key: "activities", isArray: true },
    ];

    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-lg">
        <div className="grid grid-cols-4 divide-x">
          <div className="p-4 bg-black-50">
            <h3 className="font-bold text-black-900">Comparison</h3>
          </div>
          {destinations.map((dest) => (
            <div key={dest.id} className="p-4 text-center">
              <h3 className="font-bold text-black-900">{dest.name}</h3>
            </div>
          ))}
        </div>

        {categories.map((category) => (
          <div
            key={category.key}
            className="grid grid-cols-4 divide-x border-t"
          >
            <div className="p-4 bg-black-50">
              <span className="font-medium text-blue-900">
                {category.label}
              </span>
            </div>
            {destinations.map((dest) => (
              <div
                key={`${dest.id}-${category.key}`}
                className="p-4 text-center"
              >
                {category.isArray ? (
                  <div className="flex flex-wrap justify-center gap-1">
                    {(dest[category.key as keyof typeof dest] as string[]).map(
                      (item) => (
                        <span
                          key={item}
                          className="text-xs px-2 py-1 bg-black-100 text-black-700 rounded-full"
                        >
                          {item}
                        </span>
                      )
                    )}
                  </div>
                ) : (
                  <span>{dest[category.key as keyof typeof dest]}</span>
                )}
              </div>
            ))}
          </div>
        ))}

        {/* Facts rows */}
        <div className="grid grid-cols-4 divide-x border-t">
          <div className="p-4 bg-black-50">
            <span className="font-medium text-black-900">Fun Facts</span>
          </div>
          {destinations.map((dest) => (
            <div key={`${dest.id}-facts`} className="p-4">
              <ul className="text-sm list-disc pl-4">
                {dest.facts.map((fact, i) => (
                  <li key={i} className="mb-1">
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black-500"></div>
    </div>
  );

  return (
    <div className="">
      <div className="max-w-6xl mx-auto  p-6 md:p-8 animate-fadeIn">
        {/* Progress bar */}
        {step > 0 && step < 5 && (
          <div className="mb-8">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden"></div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Budget</span>
              <span>Weather</span>
              <span>Activities</span>
              <span>Style</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="min-h-[400px] flex flex-col justify-between">
          <div className="flex-1">
            {loading ? <LoadingSpinner /> : renderStep()}
          </div>

          {/* Navigation buttons */}
          {step < 5 && (
            <div className="mt-8 flex justify-end">
              {step > 0 && (
                <button
                  className="mr-4 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:scale-105 active:scale-95 transition-transform"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </button>
              )}

              <button
                className={`px-6 py-2 rounded-lg flex items-center hover:scale-105 active:scale-95 transition-transform ${
                  isStepComplete()
                    ? "bg-black text-white border"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                onClick={isStepComplete() ? nextStep : undefined}
              >
                {step === 4 ? "Get Recommendations" : "Next"}
                <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
          )}

          {step === 5 && (
            <div className=" flex justify-end items-center">
              <button
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:scale-105 active:scale-95 transition-transform"
                onClick={() => setStep(0)}
              >
                Start Over
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
