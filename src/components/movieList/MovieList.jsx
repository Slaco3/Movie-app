import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import styles from './MovieList.module.css';

const API_KEY = import.meta.env.VITE_API_KEY;
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('popular');

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [page, setPage] = useState(1);

  /* =========================
     DEBOUNCE SEARCH
  ========================== */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // reset pagination quand on cherche
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  /* =========================
     FETCH MOVIES
  ========================== */
  useEffect(() => {
    const fetchMovies = async () => {
      const endpoint = debouncedSearch
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=fr-FR&query=${encodeURIComponent(debouncedSearch)}&page=${page}`
        : `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=fr-FR&page=${page}`;

      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Erreur fetchMovies:", error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, [category, debouncedSearch, page]);

  /* =========================
     CATEGORIES
  ========================== */
  const categories = [
    { endpoint: 'popular', label: '🔥 Populaires' },
    { endpoint: 'now_playing', label: '🎬 En salle' },
    { endpoint: 'top_rated', label: '⭐ Mieux notés' },
    { endpoint: 'upcoming', label: '🎯 À venir' }
  ];

  return (
    <div className={styles.movieListContainer}>

      {/* CATEGORIES */}
      <div className={styles.categoryTabs}>
        {categories.map(cat => (
          <button
            key={cat.endpoint}
            className={`${styles.tab} ${category === cat.endpoint ? styles.active : ''}`}
            onClick={() => {
              setCategory(cat.endpoint);
              setSearchQuery('');
              setDebouncedSearch('');
              setPage(1);
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* SEARCH */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="🔍 Rechercher un film..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* MOVIES */}
      <ul className={styles.movieGrid}>
        {movies.map(movie => (
          <li key={movie.id} className={styles.movieCard}>
            <img
              src={movie.poster_path
                ? `${IMG_BASE_URL}${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Image'}
              alt={movie.title}
            />
            <div className={styles.movieInfo}>
              <h3 className={styles.movieTitle}>{movie.title}</h3>
              <div className={styles.rating}>
                ⭐ {movie.vote_average?.toFixed(1)}/10
              </div>
              <p className={styles.releaseDate}>
                📅 {movie.release_date
                  ? new Date(movie.release_date).toLocaleDateString('fr-FR')
                  : 'Date inconnue'}
              </p>
              <Link to={`/movie/${movie.id}`}>
                <button className={styles.btnPrimary}>Voir les détails</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {/* PAGINATION */}
      <div className={styles.pagination}>
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          ◀ Précédent
        </button>

        <span>Page {page}</span>

        <button onClick={() => setPage(p => p + 1)}>
          Suivant ▶
        </button>
      </div>

    </div>
  );
}

export default MovieList;
