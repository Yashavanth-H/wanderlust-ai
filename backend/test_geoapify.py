#!/usr/bin/env python3
"""
Test script to verify Geoapify API integration
"""

import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from app.utils.geoapify_client import geoapify_client

def test_geoapify():
    """Test Geoapify API connection"""
    
    print("=" * 60)
    print("Geoapify API Test")
    print("=" * 60)
    
    # Check API key
    api_key = os.getenv('GEOAPIFY_API_KEY')
    use_api = os.getenv('USE_GEOAPIFY_API', 'false').lower() == 'true'
    
    print(f"\n📋 Configuration:")
    print(f"   API Key: {'✅ Set' if api_key and api_key != 'your_api_key_here' else '❌ Not set'}")
    print(f"   Use API: {'✅ Enabled' if use_api else '❌ Disabled'}")
    
    if not api_key or api_key == 'your_api_key_here':
        print("\n❌ ERROR: Please set your GEOAPIFY_API_KEY in .env file")
        print("   1. Get your free API key from: https://myprojects.geoapify.com/")
        print("   2. Edit backend/.env and replace 'your_api_key_here' with your actual key")
        return False
    
    if not use_api:
        print("\n⚠️  WARNING: Geoapify API is disabled")
        print("   Set USE_GEOAPIFY_API=true in .env to enable it")
        return False
    
    # Test API call
    print(f"\n🔍 Testing API call...")
    try:
        results = geoapify_client.search_places(
            budget='medium',
            activities=['beach', 'sightseeing'],
            weather=['warm'],
            limit=3
        )
        
        if results:
            print(f"✅ SUCCESS! Fetched {len(results)} destinations from Geoapify API")
            print(f"\n📍 Sample destinations:")
            for i, dest in enumerate(results[:3], 1):
                print(f"   {i}. {dest['name']} - {dest['country']}")
                print(f"      Image: {dest['image'][:50]}...")
            return True
        else:
            print("⚠️  API returned no results (might be using fallback)")
            return False
            
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        return False

if __name__ == "__main__":
    success = test_geoapify()
    print("\n" + "=" * 60)
    if success:
        print("✅ Geoapify API is working correctly!")
    else:
        print("❌ Geoapify API test failed - check configuration above")
    print("=" * 60)
    sys.exit(0 if success else 1)
