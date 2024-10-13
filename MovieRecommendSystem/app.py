import pandas as pd
import pickle
import streamlit as st
import requests

# Load movie dictionary and create a DataFrame
movies_dict = pickle.load(open('movie_dict.pkl', 'rb'))
movies = pd.DataFrame(movies_dict)

# Load similarity matrix
similarity = pickle.load(open('similarity.pkl', 'rb'))

# Debugging information
print(f"Movies DataFrame shape: {movies.shape}")
print(f"Similarity matrix type: {type(similarity)}, shape: {similarity.shape}")

def fetch_poster(movie_id, api_key):
    try:
        response = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language=en-US')
        data = response.json()
        poster_path = data.get('poster_path')
        if poster_path:
            return f"https://image.tmdb.org/t/p/w500{poster_path}"
        else:
            return "https://via.placeholder.com/500x750?text=No+Poster+Available"
    except Exception as e:
        print(f"An error occurred while fetching poster: {e}")
        return "https://via.placeholder.com/500x750?text=No+Poster+Available"

def recommend(movie, api_key):
    try:
        # Find the index of the movie in the DataFrame
        movie_index = movies[movies['title'] == movie].index[0]
        print(f"Movie index: {movie_index}")

        # Ensure movie_index is within the bounds of the similarity matrix
        if movie_index < 0 or movie_index >= len(similarity):
            raise IndexError(f"Movie index {movie_index} is out of bounds.")

        distances = similarity[movie_index]

        # Get a list of movie indices sorted by similarity
        movie_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]

        recommend_movies = [movies.iloc[i[0]].title for i in movie_list]
        recommend_movies_posters = [fetch_poster(movies.iloc[i[0]].movie_id, api_key) for i in movie_list]

        return recommend_movies, recommend_movies_posters
    except IndexError as e:
        print(f"IndexError: {e}")
        return ["Movie not found in the dataset."], []
    except Exception as e:
        print(f"An error occurred: {e}")
        return ["An error occurred."], []

# Streamlit app
st.title('Movie Recommender System')

# Dropdown for movie selection
selected_movie_name = st.selectbox(
    "Select a movie:",
    movies['title'].values
)

# API key for fetching posters
api_key = '01f9af4886c7fb97667aea5735ad3fd4'

# Button for recommendation
if st.button("Recommend"):
    names, posters = recommend(selected_movie_name, api_key)

    cols = st.columns(5)
    for i, col in enumerate(cols):
        if i < len(names):
            with col:
                st.image(posters[i], use_column_width=True)
                st.markdown(f'<p style="text-align: center; font-size: 20px;">{names[i]}</p>', unsafe_allow_html=True)
