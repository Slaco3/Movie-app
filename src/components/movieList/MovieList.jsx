import { useState, useEffect } from 'react'
import { Link } from "react-router";

import styles from './MovieList.module.css';


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


    return (
        <div className={styles.movieListContainer}>
            <h1>🎬 Catalogue de Films</h1>

            <div className={styles.categoryTabs}>
                {categories.map(cat => (
                    <button
                        key={cat.endpoint}
                        className={`${styles.tab} ${category === cat.endpoint ? styles.active : ''}`}
                        onClick={() => setCategory(cat.endpoint)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <ul className={styles.movieGrid}>
                {movies.map(movie => (
                    <li key={movie.id} className={styles.movieCard}>
                        <img
                            src={movie.poster_path
                                ? `${IMG_BASE_URL}${movie.poster_path}`
                                : 'https://via.placeholder.com/500x750?text=No+Image'
                            }
                            alt={movie.title}
                        />
                        <div className={styles.movieInfo}>
                            <h3 className= {styles.movieTitle}> title : {movie.title}</h3>
                            <div className= {styles.rating}>⭐ {movie.vote_average.toFixed(1)}/10</div>
                            <p className={styles.releaseDate}>
                                📅 {new Date(movie.release_date).toLocaleDateString('fr-FR')}
                            </p>
                            <Link to= {`/movie/${movie.id}`}>
                                <button className= {styles.btnPrimary}>Voir les détails</button>
                            </Link>
                        </div>

                    </li>
                ))}
            </ul>
        </div>

    )
}

export default MovieList