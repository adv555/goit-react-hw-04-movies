import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as MoviesAPI from '../../services/api';

function ReviewSubView() {
  const { movieId } = useParams();
  // const location = useLocation();
  const [reviews, setReview] = useState(null);
  //   console.log(params);
  //   console.log(reviews);
  // console.log(location);

  useEffect(() => {
    MoviesAPI.fetchfMovieReview(movieId)
      .then(movie => movie.results)
      .then(setReview)
      .catch(error => console.log(error));
  }, [movieId]);

  return (
    <div>
      <h3>Reviews</h3>
      {reviews && reviews.length !== 0 ? (
        <ul className="list">
          {reviews.map(
            ({ id, author, author_details, created_at, content }) => {
              return (
                <li key={id}>
                  {author_details.avatar_path && (
                    <img
                      src={
                        // author_details.avatar_path.slice(1) ||
                        `https://image.tmdb.org/t/p/original/${author_details.avatar_path}`
                      }
                      alt={author}
                      style={{ width: '80px' }}
                    />
                  )}
                  <h4>Author: {author.toUpperCase()}</h4>
                  <p>Created: {created_at.split('T')[0]}</p>
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

// author_details: avatar_path: '/https://secure.gravatar.com/avatar/3593437cbd05cebe0a4ee753965a8ad1.jpg';
