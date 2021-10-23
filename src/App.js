import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import AppBar from './components/AppBar';
import Container from './components/Container/Container';

const HomeView = lazy(() =>
  import('./views/Home.jsx' /* webpackChunkName: "home-view"  */),
);
const MoviesView = lazy(() =>
  import('./views/Movies.jsx' /* webpackChunkName: "movies-view"  */),
);
const MovieDetailsView = lazy(() =>
  import(
    './views/MovieDetails.jsx' /* webpackChunkName: "movie-details-view"  */
  ),
);
const NotFoundView = lazy(() =>
  import('./views/NotFound.jsx' /* webpackChunkName: "not-found-view"  */),
);

function App() {
  return (
    <div className="App">
      <AppBar />
      <Container>
        <Suspense
          fallback={
            <Loader type="ThreeDots" color="#3f51b5" height={80} width={80} />
          }
        >
          <Switch>
            <Route path="/" exact>
              <HomeView />
            </Route>
            <Route path="/movies" exact>
              <MoviesView />
            </Route>
            <Route path="/movies/:movieId">
              <MovieDetailsView />
            </Route>
            <Route>
              <NotFoundView />
            </Route>
          </Switch>
        </Suspense>
      </Container>
    </div>
  );
}

export default App;
