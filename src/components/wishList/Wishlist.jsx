import { useContext, useState } from "react";
import { WishlistContext } from "../../contexts/WishlistContext.jsx";
import styles from './Wishlist.module.css';

function Wishlist() {
    const { wishlist, removeFromWishlist } = useContext(WishlistContext);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredWishlist = wishlist.filter(film =>
        film.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.wishlistContainer}>
            <h1>🎯 Ma Wishlist</h1>

            <input
                type="text"
                placeholder="🔍 Rechercher un film..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
            />

            {filteredWishlist.length === 0 ? (
                <p>Aucun film dans la wishlist.</p>
            ) : (
                <ul className={styles.wishlistGrid}>
                    {filteredWishlist.map(film => (
                        <li key={film.id} className={styles.wishlistCard}>
                            <img
                                src={film.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                                    : 'https://via.placeholder.com/500x750?text=No+Image'}
                                alt={film.title}
                                className={styles.poster}
                            />
                            <h3 className={styles.title}>{film.title}</h3>
                            <button
                                className={styles.btnRemove}
                                onClick={() => removeFromWishlist(film.id)}
                            >
                                Supprimer
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Wishlist;
