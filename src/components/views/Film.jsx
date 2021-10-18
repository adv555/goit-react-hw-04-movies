import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as MoviesAPI from '../../services/api';

function MovieInfo() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  console.log(movie);

  useEffect(() => {
    MoviesAPI.fetchFullInfoOfMovie(movieId).then(setMovie);
  }, [movieId]);

  console.log(movieId);
  // console.log(params);

  return (
    <>
      <h2>{`Movie ${movieId}`}</h2>
      {movie && (
        <>
          <h3>{movie.title}</h3>
        </>
      )}
    </>
  );
}

export default MovieInfo;
