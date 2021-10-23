import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../components/Searchbar/';
import MovieSearchLIst from '../components/MovieLIst';
import * as MoviesAPI from '../services/api';
import scrollContent from '../utils/scroll';
import LoadMoreButon from '../components/Buttons/LoadMoreBtn';
// import NothingFoundMessage from '../components/Notices';

const Movies = () => {
  const history = useHistory();
  const location = useLocation();

  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) {
      return;
    }
    history.push({ ...location, search: `search=${query}` });

    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    // if (location.search === '') {
    //   return;
    // }
    const getLocationSearch = new URLSearchParams(location.search).get(
      'search',
    );

    setQuery(getLocationSearch);
  }, [location.search]);

  const onChangeQuery = query => {
    console.log(query);
    setQuery(query);
    setMovies([]);
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
      .catch(error => console.log(error));
  };

  return (
    <>
      <Searchbar onSubmit={onChangeQuery} />
      <h1>Movies page</h1>
      {/* {movies && movies.length < 1 && <NothingFoundMessage />} */}
      {/* { error && <h1>{error.message}</h1>} */}

      <MovieSearchLIst moviesBySearch={movies} />
      {movies && movies.length > 0 && <LoadMoreButon onClick={getMovies} />}

      <ToastContainer autoClose={3000} theme={'colored'} />
    </>
  );
};

export default Movies;
