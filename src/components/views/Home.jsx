import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as MovieAPI from '../../services/api';

function Home() {
  const location = useLocation();
  const [movies, setMovies] = useState(null);

  // console.log(movies);
  // console.log(location);

  useEffect(() => {
    return MovieAPI.fetchTrending()
      .then(movie => movie.results)
      .then(setMovies)
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <h1>Trending Movies</h1>
      <ul className="list">
        {movies &&
          movies.map(({ id, name, title }) => (
            <li key={id}>
              {/* <Link to={`/movies/${id}`}>{name ?? title}</Link> */}
              <Link
                to={{
                  pathname: `/movies/${id}`,
                  state: {
                    from: {
                      location,
                      label: 'Back to movies',
                    },
                  },
                }}
              >
                {name ?? title}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}

export default Home;
