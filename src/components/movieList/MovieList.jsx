import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import styles from './MovieList.module.css';

const API_KEY = "acd1a45ad141f2248344570c0d8c2ff3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // valeur validée pour recherche

  // fetchMovies selon category ou searchTerm validé
  useEffect(() => {
    const fetchMovies = async () => {
      const endpoint = searchTerm
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=fr-FR&query=${encodeURIComponent(searchTerm)}`
        : `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=fr-FR`;

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
  }, [category, searchTerm]);

  // catégories
  const categories = [
    { endpoint: 'popular', label: '🔥 Populaires' },
    { endpoint: 'now_playing', label: '🎬 En salle' },
    { endpoint: 'top_rated', label: '⭐ Mieux notés' },
    { endpoint: 'upcoming', label: '🎯 À venir' }
  ];

  // valider la recherche
  const handleSearchClick = () => {
    setSearchTerm(searchQuery);
    setCategory(''); // désactiver la catégorie si recherche active
  };

  return (
    <div className={styles.movieListContainer}>
      {/* <h1>🎬 Catalogue de Films</h1> */}

      <div className={styles.categoryTabs}>
        {categories.map(cat => (
          <button
            key={cat.endpoint}
            className={`${styles.tab} ${category === cat.endpoint ? styles.active : ''}`}
            onClick={() => {
              setCategory(cat.endpoint);
              setSearchTerm(''); // reset recherche si catégorie cliquée
              setSearchQuery(''); // vider champ
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="🔍 Rechercher un film..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={handleSearchClick} className={styles.btnPrimary}>
          Rechercher
        </button>
      </div>

      <ul className={styles.movieGrid}>
        {movies.map(movie => (
          <li key={movie.id} className={styles.movieCard}>
            <img
              src={movie.poster_path ? `${IMG_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
              alt={movie.title}
            />
            <div className={styles.movieInfo}>
              <h3 className={styles.movieTitle}>{movie.title}</h3>
              <div className={styles.rating}>⭐ {movie.vote_average.toFixed(1)}/10</div>
              <p className={styles.releaseDate}>📅 {movie.release_date ? new Date(movie.release_date).toLocaleDateString('fr-FR') : 'Date inconnue'}</p>
              <Link to={`/movie/${movie.id}`}>
                <button className={styles.btnPrimary}>Voir les détails</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
