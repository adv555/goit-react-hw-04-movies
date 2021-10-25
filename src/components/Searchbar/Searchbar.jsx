import s from './Searchbar.module.scss';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export default function Searchbar({ onSubmit, prevQuery }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (!prevQuery) {
      return;
    }
    setQuery(prevQuery);
  }, [prevQuery]);

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.error('Введите Ваш Запрос');
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <div className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search ..."
          onChange={handleChange}
          value={query}
        />
      </form>
    </div>
  );
}

Searchbar.prototype = {
  onSubmit: PropTypes.func.isRequired,
  prevQuery: PropTypes.string,
};
