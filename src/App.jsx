import { Routes, Route } from "react-router"

import MovieList from './components/movieList/MovieList.jsx'
import MovieDetail from './components/movieDetail/MovieDetail.jsx'

import { WishlistProvider } from './contexts/WishlistContext';

function App() {
  return (
    <WishlistProvider>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </WishlistProvider>
    // <MovieList />
  );

}

export default App
