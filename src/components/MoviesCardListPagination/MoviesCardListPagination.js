import React from 'react';

import './MoviesCardListPagination.css';

function MoviesCardListPagination(props) {
  if (props.show) {
    return (
      <section className="movies__pagination-wrap">
        <button type="button" className="movies__pagination-button" onClick={props.onClick}>Ещё</button>
      </section>
    );
  }
  return null;
}

export default MoviesCardListPagination;
