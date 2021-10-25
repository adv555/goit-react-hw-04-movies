import s from './CastSubView.module.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as MoviesAPI from '../../services/api';

export default function CastSubView() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    MoviesAPI.fetchfMovieCast(movieId)
      .then(movie => movie.cast)
      .then(setCast)
      .catch(error => console.log(error));
  }, [movieId]);

  return (
    <div>
      {/* <h3 className={s.SupTitle}>Cast</h3> */}
      {cast && cast.length !== 0 ? (
        <ul className={s.CastGallery}>
          {cast.map(({ cast_id, character, name, profile_path }) => {
            return (
              <li key={cast_id} className={s.GalleryItem}>
                {profile_path && (
                  <img
                    src={
                      // author_details.avatar_path.slice(1) ||
                      `https://image.tmdb.org/t/p/original/${profile_path}`
                    }
                    alt={name}
                    // style={{ width: '80px' }}
                    className={s.GalleryItemImage}
                  />
                )}
                <h4 className={s.Title}>Actor: {name.toUpperCase()}</h4>
                <p className={s.SubTitle}> Character: {character}</p>
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

CastSubView.prototype = {
  movieId: PropTypes.string,
  cast: PropTypes.shape({
    cast_id: PropTypes.number.isRequired,
    character: PropTypes.string,
    name: PropTypes.string,
    profile_path: PropTypes.string,
  }),
};
