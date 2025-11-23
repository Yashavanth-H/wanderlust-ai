"""
Amadeus Travel API Client
Fetches real destination data from Amadeus API
"""

import os
from typing import List, Dict, Optional
from dotenv import load_dotenv
import requests

# Load environment variables
load_dotenv()

class AmadeusClient:
    """Client for Amadeus Travel API"""
    
    def __init__(self):
        self.api_key = os.getenv('AMADEUS_API_KEY')
        self.api_secret = os.getenv('AMADEUS_API_SECRET')
        self.environment = os.getenv('AMADEUS_ENVIRONMENT', 'test')
        
        # Set base URL based on environment
        if self.environment == 'production':
            self.base_url = 'https://api.amadeus.com'
        else:
            self.base_url = 'https://test.api.amadeus.com'
        
        self.access_token = None
        
    def _get_access_token(self) -> str:
        """Get OAuth2 access token"""
        if self.access_token:
            return self.access_token
            
        url = f'{self.base_url}/v1/security/oauth2/token'
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        data = {
            'grant_type': 'client_credentials',
            'client_id': self.api_key,
            'client_secret': self.api_secret
        }
        
        try:
            response = requests.post(url, headers=headers, data=data)
            response.raise_for_status()
            self.access_token = response.json()['access_token']
            return self.access_token
        except Exception as e:
            print(f"Error getting access token: {e}")
            return None
    
    def search_destinations(self, 
                          budget: str = None,
                          activities: List[str] = None,
                          limit: int = 10) -> List[Dict]:
        """
        Search for destinations based on criteria
        
        Args:
            budget: Budget level (low, medium, high)
            activities: List of preferred activities
            limit: Maximum number of results
            
        Returns:
            List of destination dictionaries
        """
        token = self._get_access_token()
        if not token:
            # Return fallback data if API is not configured
            return self._get_fallback_destinations()
        
        # Use Amadeus Points of Interest API
        url = f'{self.base_url}/v1/shopping/activities'
        headers = {'Authorization': f'Bearer {token}'}
        
        # Map budget to price range
        price_range = self._map_budget_to_price(budget)
        
        params = {
            'latitude': 28.6139,  # Default to Delhi, India
            'longitude': 77.2090,
            'radius': 50,
            'limit': limit
        }
        
        try:
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            data = response.json()
            
            # Transform API response to our format
            return self._transform_api_response(data.get('data', []))
        except Exception as e:
            print(f"Error fetching destinations: {e}")
            return self._get_fallback_destinations()
    
    def _map_budget_to_price(self, budget: str) -> str:
        """Map budget level to price range"""
        mapping = {
            'low': '0-50',
            'medium': '50-150',
            'high': '150-500'
        }
        return mapping.get(budget, '0-500')
    
    def _transform_api_response(self, api_data: List[Dict]) -> List[Dict]:
        """Transform Amadeus API response to our destination format"""
        destinations = []
        
        for item in api_data:
            destination = {
                'id': item.get('id', ''),
                'name': item.get('name', 'Unknown'),
                'country': item.get('geoCode', {}).get('country', 'Unknown'),
                'description': item.get('shortDescription', ''),
                'avg_budget': self._format_price(item.get('price', {})),
                'weather': ['Varies'],
                'activities': [item.get('type', 'Sightseeing')],
                'travel_with': ['Everyone'],
                'best_season': ['Year-round'],
                'image': item.get('pictures', [''])[0] if item.get('pictures') else '',
                'googlemap_link': f"https://maps.google.com/?q={item.get('geoCode', {}).get('latitude', 0)},{item.get('geoCode', {}).get('longitude', 0)}",
                'tags': [item.get('type', '').lower()]
            }
            destinations.append(destination)
        
        return destinations
    
    def _format_price(self, price_data: Dict) -> str:
        """Format price data to string"""
        if not price_data:
            return 'Contact for pricing'
        
        amount = price_data.get('amount', 'N/A')
        currency = price_data.get('currencyCode', 'USD')
        return f'{currency} {amount}'
    
    def _get_fallback_destinations(self) -> List[Dict]:
        """Return fallback destinations when API is not available"""
        # This will use the destinations.json file
        return []


# Create singleton instance
amadeus_client = AmadeusClient()
