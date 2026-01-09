import { Routes, Route } from "react-router"

import MovieList from './components/movieList/MovieList.jsx'
import MovieDetail from './components/movieDetail/MovieDetail.jsx'

function App() {
  return (
      <Routes>
        <Route path="/" element = {<MovieList/>}/>
        <Route path="/movie/:id" element = {<MovieDetail/>}/>
      </Routes>
    // <MovieList />
    );
  
}

export default App
