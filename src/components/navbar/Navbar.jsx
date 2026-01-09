import { Link } from "react-router";
import { useContext } from "react";
import { WishlistContext } from "../../contexts/WishlistContext";
import styles from './Navbar.module.css';

function Navbar() {
    const { wishlist } = useContext(WishlistContext);

    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logo}>🎬 FilmApp</Link>
            <Link to="/wishlist" className={styles.wishlistLink}>
                Wishlist ({wishlist.length})
            </Link>
        </nav>
    );
}

export default Navbar;