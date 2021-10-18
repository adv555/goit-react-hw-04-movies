import './App.css';
import { Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import AppBar from './components/AppBar';
import Searchbar from './components/Searchbar';
import TrendFilmsList from './components/TrendFilmsList';
import Home from './components/views/Home';
import Movies from './components/views/Movies';
import NotFound from './components/views/NotFound';
import Film from './components/views/Film';

function App() {
  const [query, setQuery] = useState('');

  console.log(query);

  return (
    <div className="App">
      <AppBar />
      <Searchbar onSubmit={setQuery} />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/movies" exact>
          <Movies />
        </Route>
        <Route path="/movies/:movieId">
          <Film />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>

      <TrendFilmsList searchQuery={query} />
    </div>
  );
}

export default App;
