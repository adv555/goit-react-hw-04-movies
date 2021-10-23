import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../components/Searchbar/';
import MovieSearchLIst from '../components/MovieLIst';
import * as MoviesAPI from '../services/api';
import NothingFoundMessage from '../components/Notices';

const Movies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);
  const history = useHistory();
  const location = useLocation();

  // console.log(query);
  // console.log(history);
  // console.log(location.search);

  useEffect(() => {
    if (!query) {
      return;
    }
    history.push({ ...location, search: `search=${query}` });

    MoviesAPI.fetchMoviesBySearch(query)
      .then(movies => movies.results)
      .then(setMovies)
      .catch(error => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    // if (location.search !== '') {
    //   return;
    // }
    const getLocationSearch = new URLSearchParams(location.search).get(
      'search',
    );
    // console.log(getLocationSearch);
    setQuery(getLocationSearch);
  }, [location.search]);

  return (
    <>
      <Searchbar onSubmit={setQuery} />
      <h1>Movies page</h1>
      {movies && movies.length < 1 && <NothingFoundMessage />}

      <MovieSearchLIst moviesBySearch={movies} />
      <ToastContainer autoClose={3000} theme={'colored'} />
    </>
  );
};

export default Movies;
