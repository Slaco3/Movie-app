import { Routes, Route } from "react-router"

import Navbar from './components/navbar/Navbar.jsx';
import MovieList from './components/movieList/MovieList.jsx'
import MovieDetail from './components/movieDetail/MovieDetail.jsx'
import Wishlist from './components/wishList/Wishlist.jsx'

import { WishlistProvider } from './contexts/WishlistContext';

function App() {
  return (
    <WishlistProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/wishList" element={<Wishlist />} />
      </Routes>
    </WishlistProvider>
  );

}

export default App
