import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  const [film, setFilm] = React.useState('');

  function handleFilmChange(e) {
    setFilm(e.target.value);
  }

  return (
    <form className="search-form">
      <fieldset className="search-form__field-wrap">
        <input id="film-input" type="text" className="search-form__input" placeholder="Фильм" name="film" minLength="2" maxLength="40" value={film} onChange={handleFilmChange} />
        <button type="submit" className="search-form__button"></button>
      </fieldset>
      <FilterCheckbox />
    </form>
  );
}

export default SearchForm;
