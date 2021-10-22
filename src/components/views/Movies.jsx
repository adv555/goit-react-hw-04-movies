import { useState, useEffect } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import MovieSearchLIst from '../MovieLIst/MovieList';
import * as MoviesAPI from '../../services/api';

const Movies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);

  console.log(query);

  useEffect(() => {
    if (!query) {
      return;
    }
    MoviesAPI.fetchMoviesBySearch(query).then(movies =>
      setMovies(movies.results),
    );
  }, [query]);

  return (
    <>
      <Searchbar onSubmit={setQuery} />
      <h1>Movies page</h1>
      <MovieSearchLIst moviesBySearch={movies} />
    </>
  );
};

export default Movies;
