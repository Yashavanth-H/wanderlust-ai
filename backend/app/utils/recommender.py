import os
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Import OpenTripMap client
try:
    from app.utils.opentripmap_client import opentripmap_client
    API_AVAILABLE = True
except ImportError:
    API_AVAILABLE = False

# Path to your destinations data
DATA_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "destinations.json")


def load_destinations():
    """Load list of destinations from JSON file."""
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        raise Exception("Destination data file not found.")
    except json.JSONDecodeError:
        raise Exception("Error decoding destination JSON.")


def prepare_features(destination):
    """
    Combine relevant destination features into a single string for TF-IDF.
    """
    budget = destination.get("avg_budget", "")
    weather = " ".join(destination.get("weather", []))
    activities = " ".join(destination.get("activities", []))
    season = " ".join(destination.get("best_season", []))
    group = " ".join(destination.get("travel_with", []))

    # Combined feature string
    return f"{budget} {weather} {activities} {season} {group}"


def build_tfidf_matrix(destinations):
    """
    Build TF-IDF matrix from all destination features.
    """
    features = [prepare_features(d) for d in destinations]
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(features)
    return tfidf_matrix, vectorizer


def recommend_destinations_ml(destinations, budget, weather, activities, group_type=None, season=None, top_n=5):
    """
    Recommend destinations using TF-IDF + Cosine Similarity (ML-based).
    Optionally fetches live data from OpenTripMap API if enabled.
    """
    # Try to fetch from OpenTripMap API first
    if API_AVAILABLE:
        api_destinations = opentripmap_client.search_places(
            budget=budget,
            activities=activities,
            weather=weather,
            limit=top_n
        )
        
        # If API returned results, use them
        if api_destinations:
            print(f"✅ Using {len(api_destinations)} destinations from OpenTripMap API")
            return api_destinations
    
    # Fallback to local JSON file
    print("📁 Using local destinations.json file")
    
    # Prepare user input as a combined feature string
    user_input = f"{budget} {' '.join(weather)} {' '.join(activities)}"
    if group_type:
        user_input += f" {group_type}"
    if season:
        user_input += f" {season}"

    # Build TF-IDF model using destinations
    tfidf_matrix, vectorizer = build_tfidf_matrix(destinations)

    # Transform user input using the same vectorizer
    user_vec = vectorizer.transform([user_input])

    # Compute cosine similarity between user input and all destinations
    cosine_scores = cosine_similarity(user_vec, tfidf_matrix).flatten()

    # Attach score to each destination
    scored = [{"destination": dest, "score": score} for dest, score in zip(destinations, cosine_scores)]

    # Sort by score descending
    scored.sort(key=lambda x: x["score"], reverse=True)

    # Return top N destinations
    return [item["destination"] for item in scored[:3]]