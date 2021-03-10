import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCardListPagination from '../MoviesCardListPagination/MoviesCardListPagination';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import { movieCardList } from '../../utils/staticContent';
import './Movies.css';

function Movies() {
  return (
    <main className="film-wrap">
      <SearchForm />
      <MoviesCardList films={movieCardList}/>
      <MoviesCardListPagination />
      <Preloader />
    </main>
  );
}

export default Movies;
