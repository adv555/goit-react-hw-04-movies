import { useState, useEffect } from 'react';
import * as MovieAPI from '../../services/api';
import MovieSearchLIst from '../../components/MovieLIst';

function Home() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    return MovieAPI.fetchTrending()
      .then(movie => movie.results)
      .then(setMovies)
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      {/* <h1>Trending Movies</h1> */}
      <MovieSearchLIst movies={movies} label="Back to movies" />
    </>
  );
}

export default Home;
