#!/usr/bin/env python3
"""Test OpenTripMap API directly"""

import os
import sys
from dotenv import load_dotenv

load_dotenv()

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from app.utils.opentripmap_client import opentripmap_client

print("=" * 60)
print("OpenTripMap API Test")
print("=" * 60)

api_key = os.getenv('OPENTRIPMAP_API_KEY')
use_api = os.getenv('USE_API', 'false').lower() == 'true'

print(f"\n📋 Configuration:")
print(f"   API Key: {api_key[:20]}... (length: {len(api_key) if api_key else 0})")
print(f"   Use API: {use_api}")

if not api_key or api_key == 'your_api_key_here':
    print("\n❌ ERROR: API key not set")
    sys.exit(1)

if not use_api:
    print("\n⚠️  WARNING: API is disabled (USE_API=false)")
    sys.exit(1)

print(f"\n🔍 Testing OpenTripMap API...")
try:
    results = opentripmap_client.search_places(
        budget='medium',
        activities=['beach', 'sightseeing'],
        weather=['warm'],
        limit=3
    )
    
    if results:
        print(f"✅ SUCCESS! Fetched {len(results)} destinations")
        for i, dest in enumerate(results, 1):
            print(f"\n{i}. {dest['name']}")
            print(f"   Country: {dest['country']}")
            print(f"   Description: {dest['description'][:100]}...")
            print(f"   Image: {dest['image'][:60]}...")
    else:
        print("❌ No results returned (check logs above)")
        
except Exception as e:
    print(f"❌ ERROR: {e}")
    import traceback
    traceback.print_exc()
