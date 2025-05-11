import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Construct the absolute path to the CSV file
import os

# Get current script directory
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = "/Users/mohammed_shafi/Desktop/Hack/backend/app/data/destinations.csv"
print("Looking for data file at:", DATA_FILE)
# Load dataset
try:
    df = pd.read_csv(DATA_FILE)
except FileNotFoundError:
    raise Exception(f"File not found: {DATA_FILE}")

# Combine keywords and description for better matching
df["combined"] = df["description"] + " " + df["keywords"]

# Vectorize using TF-IDF
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(df["combined"])

# Function to match dream input
def match_dream(dream_input):
    dream_vec = vectorizer.transform([dream_input])
    scores = cosine_similarity(dream_vec, tfidf_matrix).flatten()
    top_indices = scores.argsort()[-3:][::-1]
    results = df.iloc[top_indices]

    matches = []
    for _, row in results.iterrows():
        matches.append({
            'name': row['name'],
            'country': row['country'],
            'description': row['description']
        })
    return matches
# Example usage
if __name__ == "__main__":
    user_dream = input("Describe your dream (e.g., 'I saw red mountains and caves'): ")
    match_dream(user_dream)