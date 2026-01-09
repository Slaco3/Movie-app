import { useState, useEffect } from 'react'
import { Link } from "react-router";

const API_KEY = "acd1a45ad141f2248344570c0d8c2ff3"

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
                        <span> title : {movie.title}</span>
                        {/* <img src={movie.poster_path} alt="" /> */}
                        <span> {movie.rating}</span>
                        <Link to="/movies">
                            <button className="btn-primary">Voir les films</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

    )
}

export default MovieList