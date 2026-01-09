import { useState, useEffect } from 'react'
import { Link } from "react-router";

const API_KEY = "acd1a45ad141f2248344570c0d8c2ff3"
const IMG_BASE_URL =  "https://image.tmdb.org/t/p/w500"

function MovieList() {
    const [movies, setMovies] = useState([])
    const [category, setCategory] = useState('popular')

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}`)
            const data = await response.json()
            setMovies(data.results)
        }

        fetchMovies()
    }, [category])


    const categories = [
        { endpoint: 'popular', label: '🔥 Populaires' },
        { endpoint: 'now_playing', label: '🎬 En salle' },
        { endpoint: 'top_rated', label: '⭐ Mieux notés' },
        { endpoint: 'upcoming', label: '🎯 À venir' }
    ]


    const handleDetailFilm = () => {

    }

    return (
        <div className="movie-list-container">
            <h1>🎬 Catalogue de Films</h1>

            <div className="category-tabs">
                {categories.map(cat => (
                    <button
                        key={cat.endpoint}
                        className={`tab ${category === cat.endpoint ? 'active' : ''}`}
                        onClick={() => setCategory(cat.endpoint)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <img
                            src={movie.poster_path
                                ? `${IMG_BASE_URL}${movie.poster_path}`
                                : 'https://via.placeholder.com/500x750?text=No+Image'
                            }
                            alt={movie.title}
                        />
                        <div>
                            <h3> title : {movie.title}</h3>
                            <div>⭐ {movie.vote_average.toFixed(1)}/10</div>
                            <p className="release-date">
                                📅 {new Date(movie.release_date).toLocaleDateString('fr-FR')}
                            </p>
                            <Link to= {`/movie/${movie.id}`}>
                                <button className="btn-primary">Voir les détails</button>
                            </Link>
                        </div>

                    </li>
                ))}
            </ul>
        </div>

    )
}

export default MovieList