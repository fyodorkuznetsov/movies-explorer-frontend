import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList(props) {
  return (
    <section className="movies">
      {props.films.map((film, i) => (
        <MoviesCard key={i} film={film} savedTemplate={props.saved}/>
      ))}
    </section>
  );
}

export default MoviesCardList;
