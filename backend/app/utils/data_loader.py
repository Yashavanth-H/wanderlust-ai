import os
import json

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data")
DESTINATIONS_FILE = os.path.join(DATA_DIR, "destinations.json")

def load_destinations():
    try:
        with open(DESTINATIONS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        raise FileNotFoundError(f"Destinations file not found at {DESTINATIONS_FILE}")
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON in destinations file: {e}")