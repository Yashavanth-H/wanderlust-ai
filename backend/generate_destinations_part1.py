#!/usr/bin/env python3
"""
Generate 100 real Indian tourist destinations with images
"""

import json

destinations = []
id_counter = 1

# Helper function to add destinations
def add_dest(name, desc, budget, activities, image, location, tags, weather='Tropical', season='Oct-Mar'):
    global id_counter
    destinations.append({
        'id': id_counter,
        'name': name,
        'country': 'India',
        'description': desc,
        'avg_budget': budget,
        'weather': [weather],
        'activities': activities,
        'travel_with': ['Couples', 'Friends', 'Family'],
        'best_season': [season],
        'image': image,
        'googlemap_link': f'https://maps.google.com/?q={location.replace(" ", "+")}',
        'tags': tags
    })
    id_counter += 1

# Beaches & Coastal (10)
add_dest('Goa Beaches', 'Pristine beaches with vibrant nightlife and Portuguese heritage', '₹10,000 - ₹20,000', ['Beach', 'Water Sports', 'Nightlife'], 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800', 'Goa', ['beach', 'party'])
add_dest('Andaman Islands', 'Tropical islands with crystal-clear waters and coral reefs', '₹25,000 - ₹50,000', ['Scuba Diving', 'Snorkeling', 'Beach'], 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800', 'Andaman Islands', ['beach', 'diving'])
add_dest('Varkala Beach', 'Cliff-side beach in Kerala with natural springs', '₹8,000 - ₹15,000', ['Beach', 'Yoga', 'Ayurveda'], 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800', 'Varkala Kerala', ['beach', 'yoga'])
add_dest('Puri Beach', 'Sacred beach town with Jagannath Temple', '₹6,000 - ₹12,000', ['Beach', 'Temple Visits'], 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'Puri Odisha', ['beach', 'spiritual'])
add_dest('Kovalam Beach', 'Crescent beach in Kerala with lighthouse views', '₹9,000 - ₹18,000', ['Beach', 'Swimming', 'Ayurveda'], 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800', 'Kovalam Kerala', ['beach', 'lighthouse'])
add_dest('Gokarna', 'Peaceful beaches and temples in Karnataka', '₹7,000 - ₹14,000', ['Beach', 'Trekking', 'Temples'], 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800', 'Gokarna Karnataka', ['beach', 'peaceful'])
add_dest('Diu', 'Quiet beaches with Portuguese colonial architecture', '₹8,000 - ₹16,000', ['Beach', 'History', 'Water Sports'], 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800', 'Diu', ['beach', 'colonial'])
add_dest('Alibaug', 'Beach town near Mumbai with forts and water sports', '₹10,000 - ₹20,000', ['Beach', 'Forts', 'Water Sports'], 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800', 'Alibaug Maharashtra', ['beach', 'forts'])
add_dest('Tarkarli', 'Clear waters perfect for snorkeling and scuba diving', '₹9,000 - ₹18,000', ['Snorkeling', 'Scuba Diving', 'Beach'], 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800', 'Tarkarli Maharashtra', ['beach', 'diving'])
add_dest('Lakshadweep', 'Coral islands with pristine lagoons and marine life', '₹30,000 - ₹60,000', ['Snorkeling', 'Diving', 'Beach'], 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800', 'Lakshadweep', ['island', 'diving'])

# Mountains & Hill Stations (15)
add_dest('Manali', 'Himalayan resort town with snow-capped peaks', '₹12,000 - ₹25,000', ['Trekking', 'Skiing', 'Paragliding'], 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800', 'Manali Himachal', ['mountains', 'adventure'], 'Cold', 'Mar-Jun')
add_dest('Leh-Ladakh', 'High-altitude desert with stunning landscapes', '₹20,000 - ₹40,000', ['Bike Trip', 'Trekking', 'Monastery'], 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'Leh Ladakh', ['mountains', 'adventure'], 'Cold', 'May-Sep')
add_dest('Shimla', 'Colonial hill station with Victorian architecture', '₹10,000 - ₹20,000', ['Sightseeing', 'Shopping', 'Toy Train'], 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800', 'Shimla Himachal', ['hill-station', 'colonial'], 'Pleasant', 'Mar-Jun')
add_dest('Darjeeling', 'Tea gardens and views of Kanchenjunga peak', '₹11,000 - ₹22,000', ['Tea Garden Tours', 'Toy Train', 'Trekking'], 'https://images.unsplash.com/photo-1590856642302-a6b63b63b29e?w=800', 'Darjeeling West Bengal', ['tea', 'mountains'], 'Pleasant', 'Mar-May')
add_dest('Mussoorie', 'Queen of Hills with waterfalls and colonial charm', '₹9,000 - ₹18,000', ['Nature Walks', 'Cable Car', 'Waterfalls'], 'https://images.unsplash.com/photo-1571847028735-a7f2c86f6c9c?w=800', 'Mussoorie Uttarakhand', ['hill-station', 'waterfalls'], 'Pleasant', 'Apr-Jun')
add_dest('Ooty', 'Nilgiri hill station with tea gardens and lakes', '₹10,000 - ₹18,000', ['Toy Train', 'Botanical Gardens', 'Boating'], 'https://images.unsplash.com/photo-1590856642302-a6b63b63b29e?w=800', 'Ooty Tamil Nadu', ['tea', 'hill-station'], 'Pleasant', 'Mar-Jun')
add_dest('Nainital', 'Lake district with boating and scenic views', '₹9,000 - ₹17,000', ['Boating', 'Trekking', 'Cable Car'], 'https://images.unsplash.com/photo-1571847028735-a7f2c86f6c9c?w=800', 'Nainital Uttarakhand', ['lake', 'hill-station'], 'Pleasant', 'Mar-Jun')
add_dest('Munnar', 'Tea plantations and misty mountains in Kerala', '₹11,000 - ₹22,000', ['Tea Plantation Tours', 'Trekking', 'Wildlife'], 'https://images.unsplash.com/photo-1590856642302-a6b63b63b29e?w=800', 'Munnar Kerala', ['tea', 'nature'], 'Pleasant', 'Sep-Mar')
add_dest('Coorg', 'Coffee plantations and waterfalls in Karnataka', '₹10,000 - ₹20,000', ['Coffee Plantation Tours', 'Trekking', 'Waterfalls'], 'https://images.unsplash.com/photo-1571847028735-a7f2c86f6c9c?w=800', 'Coorg Karnataka', ['coffee', 'nature'], 'Pleasant', 'Oct-Mar')
add_dest('Auli', 'Skiing destination in Uttarakhand Himalayas', '₹15,000 - ₹30,000', ['Skiing', 'Cable Car', 'Trekking'], 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800', 'Auli Uttarakhand', ['skiing', 'mountains'], 'Cold', 'Dec-Mar')
add_dest('Spiti Valley', 'Remote high-altitude desert valley', '₹18,000 - ₹35,000', ['Trekking', 'Monastery Visits', 'Photography'], 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'Spiti Valley', ['mountains', 'remote'], 'Cold', 'May-Oct')
add_dest('Kasol', 'Hippie village in Parvati Valley', '₹8,000 - ₹16,000', ['Trekking', 'Camping', 'Cafes'], 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800', 'Kasol Himachal', ['mountains', 'backpacking'], 'Pleasant', 'Mar-Jun')
add_dest('Mcleodganj', 'Tibetan culture and Dalai Lama residence', '₹9,000 - ₹18,000', ['Monastery Visits', 'Trekking', 'Tibetan Culture'], 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800', 'Mcleodganj Himachal', ['tibetan', 'spiritual'], 'Pleasant', 'Mar-Jun')
add_dest('Gangtok', 'Sikkim capital with monasteries and mountain views', '₹12,000 - ₹24,000', ['Monastery Visits', 'Cable Car', 'Trekking'], 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800', 'Gangtok Sikkim', ['mountains', 'buddhist'], 'Pleasant', 'Mar-Jun')
add_dest('Shillong', 'Scotland of the East with waterfalls and lakes', '₹10,000 - ₹20,000', ['Waterfalls', 'Lakes', 'Music'], 'https://images.unsplash.com/photo-1571847028735-a7f2c86f6c9c?w=800', 'Shillong Meghalaya', ['waterfalls', 'nature'], 'Pleasant', 'Oct-May')

print(f'Generated {len(destinations)} destinations...')

# Save to file
with open('app/data/destinations.json', 'w') as f:
    json.dump(destinations, f, indent=2)

print(f'✅ Successfully saved {len(destinations)} destinations to destinations.json')
