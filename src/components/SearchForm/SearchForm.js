import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm(props) {
  const [isShort, setIsShort] = React.useState(false);
  const [phrase, setPhrase] = React.useState('');
  const [error, setError] = React.useState('');

  function handlePhraseChange(e) {
    setPhrase(e.target.value);
    if (!e.target.value) {
      setError('Нужно ввести ключевое слово');
    } else {
      setError('');
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    if (!phrase) {
      setError('Нужно ввести ключевое слово');
      return;
    }
    props.handleSearch(phrase, isShort);
  }

  function shortFilmCheckboxHandler(checked) {
    setIsShort(checked);
    props.handleSearch(phrase, checked);
  }

  return (
    <form className="search-form" action="#" encType="multipart/form-data" method="POST" onSubmit={handleSearch} noValidate>
      <fieldset className="search-form__field-wrap">
        <input id="film-input" type="text" className="search-form__input" placeholder="Фильм" name="phrase" minLength="2" maxLength="40" value={phrase} onChange={handlePhraseChange} required />
        <button type="submit" className="search-form__button"></button>
      </fieldset>
      <p className={`error-notifier ${error ? '' : 'error-notifier_state_hidden'}`}>{error}</p>
      <FilterCheckbox onChange={shortFilmCheckboxHandler} />
    </form>
  );
}

export default SearchForm;
