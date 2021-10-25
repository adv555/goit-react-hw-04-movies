import s from './ReviewSubview.module.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as MoviesAPI from '../../services/api';

function ReviewSubView() {
  const { movieId } = useParams();
  const [reviews, setReview] = useState(null);
  console.log(reviews);

  useEffect(() => {
    MoviesAPI.fetchfMovieReview(movieId)
      .then(movie => movie.results)
      .then(setReview)
      .catch(error => console.log(error));
  }, [movieId]);

  return (
    <div>
      {/* <h3 className={s.title}>Reviews</h3> */}
      {reviews && reviews.length !== 0 ? (
        <ul className={s.Gallery}>
          {reviews.map(
            ({
              id,
              author,
              author_details: { avatar_path },
              created_at,
              content,
            }) => {
              return (
                <li key={id} className={s.GalleryItem}>
                  {avatar_path && (
                    <img
                      src={
                        // author_details.avatar_path.slice(1) ||
                        `https://image.tmdb.org/t/p/original/${avatar_path}`
                      }
                      alt={author}
                      style={{ width: '80px' }}
                      className={s.GalleryItemImage}
                    />
                  )}
                  <h4>Author: {author.toUpperCase()}</h4>
                  <p className={s.text}>
                    <b>Created:</b> {created_at.split('T')[0]}
                  </p>

                  <p>{content}</p>
                </li>
              );
            },
          )}
        </ul>
      ) : (
        <h4>Nothing Found</h4>
      )}
    </div>
  );
}

export default ReviewSubView;

ReviewSubView.prototype = {
  movieId: PropTypes.string,
  reviews: PropTypes.shape({
    id: PropTypes.string,
    author: PropTypes.string,
    avatar_path: PropTypes.string,
    created_at: PropTypes.string,
  }),
};
