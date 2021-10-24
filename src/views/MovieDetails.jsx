import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  Route,
  Switch,
  NavLink,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
// import { TiArrowLeftThick } from 'react-icons/ti';
import * as MoviesAPI from '../services/api';
import OnGoBackButton from '../components/Buttons/OnGoBackBtn/OnGoBackBtn';

const CastSubView = lazy(() =>
  import('../components/CastSubView' /* webpackChunkName: "cast-subview" */),
);
const ReviewSubView = lazy(() =>
  import(
    '../components/ReviewSubView' /* webpackChunkName: "review-subview" */
  ),
);

function MovieInfo() {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    MoviesAPI.fetchFullInfoOfMovie(movieId)
      .then(setMovie)
      .catch(error => console.log(error));
  }, [movieId]);

  // console.log(movieId);
  // console.log(movie);
  // console.log(match);
  // console.log(params);
  // console.log(url, path);
  console.log(location.state);
  // console.log(history)

  const onGoBack = () => {
    history.push(location?.state?.from?.location ?? '/');
  };

  return (
    <>
      {movie && movie.status === 'Released' && (
        <>
          <OnGoBackButton
            onClick={onGoBack}
            label={location?.state?.from?.label ?? 'Go Back'}
          />
          {/* <button type="button" className="Button" onClick={onGoBack}>
            <TiArrowLeftThick />
            {location?.state?.from?.label ?? 'Go Back'}
          </button> */}
          <div className="card">
            <div className="cardThumb">
              <img
                className="cardThumb-image"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <div className="cardDesc">
              <h2>{`${movie.title} (${movie.release_date.split('-')[0]})`}</h2>
              <p>{`User Score: ${movie.vote_average}`}</p>
              <h3>Overeview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p>{movie.genres.map(obj => Object.values(obj)[1]).join(' ')}</p>
            </div>
          </div>
          <div>
            <hr />
            <h3>Additional information</h3>
            <ul className="list">
              <li>
                <NavLink
                  className="link"
                  activeClassName="activeLink"
                  to={{
                    pathname: `${url}/cast`,
                    state: { from: { location } },
                  }}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link"
                  activeClassName="activeLink"
                  // to={`${url}/reviews`}
                  to={{
                    pathname: `${url}/reviews`,
                    state: { from: { location } },
                  }}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>

            <hr />
          </div>
          <div>
            <Suspense fallback={<h1>Loading...</h1>}>
              <Switch>
                <Route path={`${path}/cast`} exact>
                  <CastSubView />
                </Route>

                <Route path={`${path}/reviews`} exact>
                  <ReviewSubView />
                </Route>
              </Switch>
            </Suspense>
          </div>
        </>
      )}
    </>
  );
}

export default MovieInfo;

// {
//   movie.genres.map(({ id, name }) => {
//     return <span key={`${id}+${name}`}>{Object.values(name)}&nbsp;&nbsp;</span>;
//   });
// }

/* <OnGoBackButton onClick={onGoBack} label={location?.state?.from?.label ?? 'Go Back'} /> */
