from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.app.utils.dream_matcher import match_dream
from utils.data_loader import load_destinations
from utils.recommender import recommend_destinations_ml
import os

app = FastAPI()

# Allow CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Load destinations at startup
try:
    DESTINATIONS = load_destinations()
    print(f"✅ Loaded {len(DESTINATIONS)} destinations.")
except Exception as e:
    raise RuntimeError(f"Failed to load destinations: {e}")

# Pydantic model for input validation
class UserPreferences(BaseModel):
    budget: str  # low / medium / high
    weather: list[str]
    activities: list[str]
    group_type: str = None  # optional
    season: str = None  # optional


@app.get("/")
def read_root():
    return {
        "success": "success",
        "destinations": DESTINATIONS
    }


@app.post("/recommend")
async def get_recommendations(preferences: UserPreferences):
    print(preferences)
    try:
        recommendations = recommend_destinations_ml(
            destinations=DESTINATIONS,
            budget=preferences.budget,
            weather=preferences.weather,
            activities=preferences.activities,
            group_type=preferences.group_type,
            season=preferences.season
        )
        return {
            "status": "success",
            "recommendations": recommendations
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


@app.post("/match-dream")
async def match_dream_endpoint(request: Request):
    data = await request.json()
    print("Received data:", data)
    if not data or 'dream' not in data:
        raise HTTPException(status_code=400, detail='No dream input provided')

    dream_input = data['dream']

    try:
        # Call the match_dream function to get matches
        matches = match_dream(dream_input)  # Should return a list of matched destinations

        # Transform matches into the desired format
        formatted_matches = [
            {
                "id": str(destination.get("id", "")),
                "name": destination.get("name", ""),
                "country": destination.get("country", ""),
                "description": destination.get("description", ""),
                "image": destination.get("image", ""),
                "cost": destination.get("avg_budget", ""),
                "weather": " ".join(destination.get("weather", [])),
                "activities": destination.get("activities", []),
                "bestFor": " ".join(destination.get("travel_with", [])),
                "rating": destination.get("rating", 0),
                "facts": destination.get("facts", []),
                "tags": destination.get("tags", []),
            }
            for destination in matches
        ]

        return {"matches": formatted_matches}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Something went wrong: {str(e)}")