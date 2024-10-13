import { useEffect, useState } from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'https://api.themoviedb.org/3/search/movie?api_key=01f9af4886c7fb97667aea5735ad3fd4'

const movie1 = {
    "Title": "Spider-Man",
    "Year": "2002",
    "imdbID": 557,
    "Type": "movie",
    "Poster": "https://image.tmdb.org/t/p/w500/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg"
}

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&query=${title}`);
        const data = await response.json();

        const formattedMovies = data.results.map(movie => ({
            Title: movie.title,
            Year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A', // Extract the year from release date
            imdbID: movie.id, // Assuming movie.id is used as the identifier similar to imdbID
            Type: movie.media_type || 'movie', // If there's no 'type' field, default to 'movie'
            Poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'N/A' // Full URL for the poster
        }));
    
        setMovies(formattedMovies);
    }

    useEffect(() => {
        searchMovies('Spiderman');
    }, []);
    
    return(
        <div className="app">
            <div class="heading-container">
                <img src="/vision2.gif" alt="vision" class="heading-image" />
                <h1>CineCurate</h1>
                <img src="/vision2.gif" alt="vision" class="heading-image" />
            </div>

            <div className="search">
                <input
                placeholder="Search for movies"
                value = {searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
                />
                </div>

                {
                    movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie = {movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <p>No movies found</p>
                        </div>
                    )
                }
                </div>
                    );
                }

export default App;