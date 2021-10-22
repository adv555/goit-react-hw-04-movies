import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as MoviesAPI from '../../services/api';

export default function CastSubView() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  // const location = useLocation();
  // const params = useParams();
  // console.log(params);
  // console.log(movieId);
  // console.log(cast);
  // console.log(location.state);

  useEffect(() => {
    MoviesAPI.fetchfMovieCast(movieId)
      .then(movie => movie.cast)
      .then(setCast)
      .catch(error => console.log(error));
  }, [movieId]);

  return (
    <div>
      <h3>Cast</h3>
      {cast && cast.length !== 0 ? (
        <ul className="list">
          {cast.map(({ cast_id, character, name, profile_path }) => {
            return (
              <li key={cast_id}>
                {profile_path && (
                  <img
                    src={
                      // author_details.avatar_path.slice(1) ||
                      `https://image.tmdb.org/t/p/original/${profile_path}`
                    }
                    alt={name}
                    style={{ width: '80px' }}
                  />
                )}
                <h4>Actor: {name.toUpperCase()}</h4>
                <p> Character:{character}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <h4>Nothing Found</h4>
      )}
    </div>
  );
}
