import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../../components/Searchbar';
import MovieSearchLIst from '../../components/MovieLIst';
import LoadMoreButon from '../../components/Buttons/LoadMoreBtn';
import scrollContent from '../../utils/scroll';
import * as MoviesAPI from '../../services/api';

const Movies = () => {
  const history = useHistory();
  const location = useLocation();

  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) {
      return;
    }
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (location.search === '') {
      return;
    }
    const getLocationSearch = new URLSearchParams(location.search).get(
      'search',
    );

    setQuery(getLocationSearch);
  }, [location.search]);

  const onChangeQuery = query => {
    setQuery(query);
    setMovies([]);
    setPage(1);
    setError(null);
    history.push({ ...location, search: `search=${query}` });
  };

  const getMovies = () => {
    MoviesAPI.fetchMoviesBySearch(query, page)
      .then(movies => movies.results)
      .then(newMovies => {
        if (newMovies.length === 0) {
          toast.info('Nothing found 🙄', {
            autoClose: 2000,
          });
        }
        setMovies(movies => [...movies, ...newMovies]);
        setPage(page + 1);
        if (page > 1) {
          scrollContent();
        }
      })
      .catch(setError);
  };

  return (
    <>
      <Searchbar onSubmit={onChangeQuery} prevQuery={query} />
      {error && <h1>Something went wrong! {error.message}</h1>}

      <MovieSearchLIst movies={movies} label="Back to search" />
      {movies && movies.length > 0 && <LoadMoreButon onClick={getMovies} />}

      <ToastContainer autoClose={3000} theme={'colored'} />
    </>
  );
};

export default Movies;
