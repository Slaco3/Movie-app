import MovieList from './components/movieList/MovieList.jsx'
import { Routes, Route } from "react-router"


function App() {
  return (
      <Routes>
        <Route path="/" element = {<MovieList/>}/>
        {/* <Route path="/movie/:id" element = {<MovieDetail/>}/> */}
      </Routes>
    // <MovieList />
    );
  
}

export default App
