import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar';

import Home from './components/views/Home';
import Movies from './components/views/Movies';
import NotFound from './components/views/NotFound';
import MovieDetails from './components/views/MovieDetails';

function App() {
  return (
    <div className="App">
      <AppBar />

      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/movies" exact>
          <Movies />
        </Route>
        <Route path="/movies/:movieId">
          <MovieDetails />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
