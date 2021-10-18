import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import * as MovieAPI from '../../services/api';

function Home() {
  const match = useRouteMatch();
  const [movies, setMovies] = useState(null);

  console.log(movies);
  console.log(match);

  useEffect(() => {
    return MovieAPI.fetchTrending()
      .then(movie => movie.results)
      .then(setMovies);
  }, []);

  return (
    <>
      <h1>Trendy Movies</h1>
      <ul className="list">
        {movies &&
          movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                {movie.name ?? movie.title}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}

export default Home;
