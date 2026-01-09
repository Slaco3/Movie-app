import { useState, useEffect } from 'react'
import { Link } from "react-router";

const API_KEY = "acd1a45ad141f2248344570c0d8c2ff3"

function MovieList() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
            const data = await response.json()
            setMovies(data.results)
        }

        fetchMovies()
    }, [])


    const handleDetailFilm = () => {

    }

    return (
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
    )
}

export default MovieList