"""
Geoapify Places API Client
Fetches real destination data from Geoapify API
"""

import os
from typing import List, Dict, Optional
from dotenv import load_dotenv
import requests

# Load environment variables
load_dotenv()

class GeoapifyClient:
    """Client for Geoapify Places API"""
    
    def __init__(self):
        self.api_key = os.getenv('GEOAPIFY_API_KEY')
        self.base_url = 'https://api.geoapify.com/v2'
        self.use_api = os.getenv('USE_GEOAPIFY_API', 'false').lower() == 'true'
        
    def search_places(self, 
                     budget: str = None,
                     activities: List[str] = None,
                     weather: List[str] = None,
                     limit: int = 10) -> List[Dict]:
        """
        Search for places based on criteria
        
        Args:
            budget: Budget level (low, medium, high)
            activities: List of preferred activities
            weather: Weather preferences
            limit: Maximum number of results
            
        Returns:
            List of destination dictionaries
        """
        if not self.use_api or not self.api_key:
            # Return empty list to use fallback destinations.json
            return []
        
        # Map activities to Geoapify categories
        categories = self._map_activities_to_categories(activities or [])
        
        # Use major Indian cities as search centers
        # We'll search around Delhi (central India) with a large radius
        india_center = {
            'lat': 20.5937,  # Center of India
            'lon': 78.9629,
            'radius': 2000000  # 2000km radius to cover most of India
        }
        
        # Use Geoapify Places API with correct endpoint
        url = f'{self.base_url}/places'
        
        # Geoapify requires radius-based search with lat/lon
        params = {
            'categories': ','.join(categories) if categories else 'tourism.attraction',
            'filter': f"circle:{india_center['lon']},{india_center['lat']},{india_center['radius']}",
            'bias': f"proximity:{india_center['lon']},{india_center['lat']}",
            'limit': limit,
            'apiKey': self.api_key
        }
        
        try:
            response = requests.get(url, params=params, timeout=10)
            
            # Check for errors
            if response.status_code == 400:
                error_data = response.json() if response.text else {}
                print(f"⚠️  Geoapify API returned 400 error. Using fallback data.")
                print(f"   Error: {error_data.get('message', 'Unknown error')}")
                return []
            
            response.raise_for_status()
            data = response.json()
            
            # Transform API response to our format
            features = data.get('features', [])
            if not features:
                print("⚠️  Geoapify API returned no features. Using fallback data.")
                return []
            
            print(f"✅ Fetched {len(features)} places from Geoapify API")
            return self._transform_api_response(features, budget)
        except requests.exceptions.Timeout:
            print(f"⚠️  Geoapify API timeout. Using fallback data.")
            return []
        except Exception as e:
            print(f"⚠️  Error fetching places from Geoapify: {e}")
            return []
    
    def _map_activities_to_categories(self, activities: List[str]) -> List[str]:
        """Map user activities to Geoapify categories"""
        activity_mapping = {
            'beach': ['beach', 'tourism.attraction'],
            'adventure': ['sport', 'tourism.attraction'],
            'culture': ['tourism.attraction', 'entertainment.culture'],
            'food': ['catering.restaurant'],
            'nightlife': ['entertainment.nightclub'],
            'sightseeing': ['tourism.attraction', 'tourism.sights'],
            'shopping': ['commercial.shopping_mall'],
            'nature': ['natural', 'tourism.attraction'],
            'hiking': ['sport', 'natural'],
            'water sports': ['beach', 'sport']
        }
        
        categories = set()
        for activity in activities:
            activity_lower = activity.lower()
            for key, cats in activity_mapping.items():
                if key in activity_lower:
                    categories.update(cats)
        
        return list(categories) if categories else ['tourism.attraction']
    
    def _transform_api_response(self, features: List[Dict], budget: str) -> List[Dict]:
        """Transform Geoapify API response to our destination format"""
        destinations = []
        
        for idx, feature in enumerate(features):
            props = feature.get('properties', {})
            
            # Get place details
            name = props.get('name', 'Unknown Place')
            city = props.get('city', '')
            state = props.get('state', '')
            country = props.get('country', 'India')
            
            # Create description
            location_parts = [city, state] if city and state else [state] if state else [city] if city else []
            location_str = ', '.join(filter(None, location_parts))
            description = f"{name} in {location_str}" if location_str else name
            
            # Get coordinates for image and map
            coords = feature.get('geometry', {}).get('coordinates', [0, 0])
            lon, lat = coords[0], coords[1]
            
            # Generate Unsplash image URL based on place type
            image_url = self._get_image_for_place(name, props.get('categories', []))
            
            destination = {
                'id': idx + 1,
                'name': name,
                'country': country,
                'description': description,
                'avg_budget': self._get_budget_range(budget),
                'weather': ['Varies by season'],
                'activities': self._get_activities_from_categories(props.get('categories', [])),
                'travel_with': ['Everyone'],
                'best_season': ['Year-round'],
                'image': image_url,
                'googlemap_link': f"https://maps.google.com/?q={lat},{lon}",
                'tags': props.get('categories', [])[:3]
            }
            destinations.append(destination)
        
        return destinations
    
    def _get_budget_range(self, budget: str) -> str:
        """Get budget range based on budget level"""
        budget_ranges = {
            'low': '₹5,000 - ₹10,000',
            'medium': '₹10,000 - ₹20,000',
            'high': '₹20,000 - ₹50,000'
        }
        return budget_ranges.get(budget, '₹10,000 - ₹20,000')
    
    def _get_activities_from_categories(self, categories: List[str]) -> List[str]:
        """Extract activities from Geoapify categories"""
        activities = []
        category_map = {
            'beach': 'Beach Activities',
            'tourism': 'Sightseeing',
            'sport': 'Adventure Sports',
            'entertainment': 'Entertainment',
            'natural': 'Nature Exploration',
            'catering': 'Dining'
        }
        
        for category in categories[:5]:
            for key, activity in category_map.items():
                if key in category.lower() and activity not in activities:
                    activities.append(activity)
        
        return activities if activities else ['Sightseeing']
    
    def _get_image_for_place(self, name: str, categories: List[str]) -> str:
        """Get appropriate Unsplash image based on place type"""
        # Default images for different categories
        category_images = {
            'beach': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
            'mountain': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
            'temple': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
            'palace': 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
            'nature': 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
            'city': 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800',
        }
        
        # Try to match category
        name_lower = name.lower()
        for key, image_url in category_images.items():
            if key in name_lower or any(key in cat.lower() for cat in categories):
                return image_url
        
        # Default tourism image
        return 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800'


# Create singleton instance
geoapify_client = GeoapifyClient()
