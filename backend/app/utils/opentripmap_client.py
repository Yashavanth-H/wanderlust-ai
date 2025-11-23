"""
OpenTripMap API Client
Fetches real tourist attractions and places from OpenTripMap API
Completely free with excellent tourist destination data
"""

import os
from typing import List, Dict, Optional
from dotenv import load_dotenv
import requests

# Load environment variables
load_dotenv()

class OpenTripMapClient:
    """Client for OpenTripMap API - Free tourist attractions API"""
    
    def __init__(self):
        self.api_key = os.getenv('OPENTRIPMAP_API_KEY')
        self.base_url = 'https://api.opentripmap.com/0.1/en/places'
        self.use_api = os.getenv('USE_API', 'false').lower() == 'true'
        
    def search_places(self, 
                     budget: str = None,
                     activities: List[str] = None,
                     weather: List[str] = None,
                     limit: int = 10) -> List[Dict]:
        """
        Search for tourist attractions based on criteria
        
        Args:
            budget: Budget level (low, medium, high)
            activities: List of preferred activities
            weather: Weather preferences
            limit: Maximum number of results
            
        Returns:
            List of destination dictionaries
        """
        if not self.use_api or not self.api_key or self.api_key == 'your_api_key_here':
            # Return empty list to use fallback destinations.json
            return []
        
        # Map activities to OpenTripMap kinds
        kinds = self._map_activities_to_kinds(activities or [])
        
        # Search for places in India (using bounding box)
        # India bounding box: [68.1766, 7.9668, 97.4025, 35.4940]
        india_bbox = {
            'lon_min': 68.1766,
            'lat_min': 7.9668,
            'lon_max': 97.4025,
            'lat_max': 35.4940
        }
        
        try:
            # First, get a list of place IDs
            bbox_url = f'{self.base_url}/bbox'
            params = {
                'lon_min': india_bbox['lon_min'],
                'lat_min': india_bbox['lat_min'],
                'lon_max': india_bbox['lon_max'],
                'lat_max': india_bbox['lat_max'],
                'kinds': kinds,
                'limit': limit * 2,  # Get more to filter
                'apikey': self.api_key
            }
            
            response = requests.get(bbox_url, params=params, timeout=10)
            response.raise_for_status()
            places = response.json()
            
            if not places or 'features' not in places:
                print("⚠️  OpenTripMap returned no places. Using fallback data.")
                return []
            
            # Get detailed information for each place
            destinations = []
            for feature in places['features'][:limit]:
                place_id = feature['properties'].get('xid')
                if not place_id:
                    continue
                
                # Get place details
                details = self._get_place_details(place_id)
                if details:
                    destination = self._transform_place_to_destination(details, budget)
                    if destination:
                        destinations.append(destination)
            
            if destinations:
                print(f"✅ Fetched {len(destinations)} real places from OpenTripMap API")
                return destinations
            else:
                print("⚠️  No valid destinations found. Using fallback data.")
                return []
                
        except Exception as e:
            print(f"⚠️  Error fetching from OpenTripMap: {e}")
            return []
    
    def _get_place_details(self, xid: str) -> Optional[Dict]:
        """Get detailed information for a specific place"""
        try:
            url = f'{self.base_url}/xid/{xid}'
            params = {'apikey': self.api_key}
            
            response = requests.get(url, params=params, timeout=5)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"⚠️  Error fetching place details for {xid}: {e}")
            return None
    
    def _map_activities_to_kinds(self, activities: List[str]) -> str:
        """Map user activities to OpenTripMap kinds"""
        activity_mapping = {
            'beach': 'beaches',
            'adventure': 'sport,climbing',
            'culture': 'cultural,museums,theatres_and_entertainments',
            'food': 'foods',
            'nightlife': 'theatres_and_entertainments',
            'sightseeing': 'interesting_places,tourist_facilities',
            'shopping': 'shops',
            'nature': 'natural',
            'hiking': 'natural,sport',
            'water sports': 'sport,beaches'
        }
        
        kinds = set()
        for activity in activities:
            activity_lower = activity.lower()
            for key, kind in activity_mapping.items():
                if key in activity_lower:
                    kinds.update(kind.split(','))
        
        # Default to interesting places if no match
        return ','.join(kinds) if kinds else 'interesting_places,tourist_facilities'
    
    def _transform_place_to_destination(self, place: Dict, budget: str) -> Optional[Dict]:
        """Transform OpenTripMap place to our destination format"""
        try:
            name = place.get('name')
            if not name or name == 'Unknown':
                return None
            
            # Get location info
            address = place.get('address', {})
            city = address.get('city', '')
            state = address.get('state', '')
            country = address.get('country', 'India')
            
            # Get coordinates
            point = place.get('point', {})
            lat = point.get('lat', 0)
            lon = point.get('lon', 0)
            
            # Get description
            description = place.get('wikipedia_extracts', {}).get('text', '')
            if not description:
                description = place.get('info', {}).get('descr', '')
            if not description:
                location_str = f"{city}, {state}" if city and state else state if state else city
                description = f"{name} in {location_str}" if location_str else name
            
            # Truncate description
            if len(description) > 200:
                description = description[:197] + '...'
            
            # Get image from Wikipedia or use category-based Unsplash
            image_url = self._get_image_url(place)
            
            # Get kinds/categories
            kinds = place.get('kinds', '').split(',')
            activities = self._get_activities_from_kinds(kinds)
            
            destination = {
                'id': abs(hash(name)) % 1000000,  # Generate numeric ID from name
                'name': name,
                'country': country,
                'description': description,
                'avg_budget': self._get_budget_range(budget),
                'weather': ['Varies by season'],
                'activities': activities,
                'travel_with': ['Everyone'],
                'best_season': ['Year-round'],
                'image': image_url,
                'googlemap_link': f"https://maps.google.com/?q={lat},{lon}",
                'tags': kinds[:5]
            }
            
            return destination
        except Exception as e:
            print(f"⚠️  Error transforming place: {e}")
            return None
    
    def _get_image_url(self, place: Dict) -> str:
        """Get image URL from Wikipedia or use category-based Unsplash"""
        # Try to get image from Wikipedia
        image = place.get('preview', {}).get('source')
        if image:
            return image
        
        # Fallback to category-based Unsplash images
        kinds = place.get('kinds', '').lower()
        
        category_images = {
            'beach': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
            'mountain': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
            'temple': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
            'palace': 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
            'museum': 'https://images.unsplash.com/photo-1565173804776-1c7d9c0c8c3e?w=800',
            'park': 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
            'fort': 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
        }
        
        for key, image_url in category_images.items():
            if key in kinds:
                return image_url
        
        # Default tourism image
        return 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800'
    
    def _get_budget_range(self, budget: str) -> str:
        """Get budget range based on budget level"""
        budget_ranges = {
            'low': '₹5,000 - ₹10,000',
            'medium': '₹10,000 - ₹20,000',
            'high': '₹20,000 - ₹50,000'
        }
        return budget_ranges.get(budget, '₹10,000 - ₹20,000')
    
    def _get_activities_from_kinds(self, kinds: List[str]) -> List[str]:
        """Extract activities from OpenTripMap kinds"""
        activities = []
        kind_map = {
            'beach': 'Beach Activities',
            'museum': 'Museum Visits',
            'cultural': 'Cultural Tours',
            'sport': 'Adventure Sports',
            'natural': 'Nature Exploration',
            'historic': 'Historical Tours',
            'architecture': 'Architecture Tours',
            'religion': 'Spiritual Tours'
        }
        
        for kind in kinds[:5]:
            kind_lower = kind.lower()
            for key, activity in kind_map.items():
                if key in kind_lower and activity not in activities:
                    activities.append(activity)
        
        return activities if activities else ['Sightseeing']


# Create singleton instance
opentripmap_client = OpenTripMapClient()
