import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import { savedMovies } from '../../utils/staticContent';
import './SavedMovies.css';

function SavedMovies() {
  return (
    <main className="saved-moves-wrap">
      <SearchForm />
      <MoviesCardList films={savedMovies} saved={true} />
      <Preloader />
    </main>
  );
}

export default SavedMovies;
