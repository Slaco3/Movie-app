import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styles from './MovieDetail.module.css';

const API_KEY = "acd1a45ad141f2248344570c0d8c2ff3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [inWishlist, setInWishlist] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                // Infos détaillées du film
                const responseMovie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr-FR`);
                const dataMovie = await responseMovie.json();
                setMovie(dataMovie);

                // Casting (acteurs principaux)
                const resCast = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=fr-FR`);
                const dataCast = await resCast.json();
                setCast(dataCast.cast.slice(0, 10)); // prendre les 10 premiers acteurs
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovie();
    }, [id]);

    const toggleWishlist = () => {
        setInWishlist(prev => !prev);
    };

    if (!movie) return <div className={styles.loading}>Chargement...</div>;

    return (
        <div className={styles.movieDetailContainer}>
            <h1 className={styles.title}>{movie.title}</h1>

            <div className={styles.detailWrapper}>
                <img
                    src={movie.poster_path ? `${IMG_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                    alt={movie.title}
                    className={styles.poster}
                />

                <div className={styles.info}>
                    <p>Résumé : {movie.overview}</p>
                    <p>Date de sortie: {new Date(movie.release_date).toLocaleDateString('fr-FR')}</p>
                    <p>Note moyenne: ⭐ {movie.vote_average.toFixed(1)}/10</p>

                    <button className={styles.btnPrimary} onClick={toggleWishlist}>
                        {inWishlist ? 'Retirer de la wishlist' : 'Ajouter à la wishlist'}
                    </button>
                </div>
            </div>

            <h2 className={styles.subTitle}>Acteurs principaux</h2>
            <ul className={styles.castGrid}>
                {cast.map(actor => (
                    <li key={actor.id} className={styles.castCard}>
                        <img
                            src={actor.profile_path ? `${IMG_BASE_URL}${actor.profile_path}` : 'https://via.placeholder.com/200x300?text=No+Image'}
                            alt={actor.name}
                            className={styles.castPhoto}
                        />
                        <p className={styles.castName}>{actor.name}</p>
                        <p className={styles.characterName}>{actor.character}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MovieDetail;
