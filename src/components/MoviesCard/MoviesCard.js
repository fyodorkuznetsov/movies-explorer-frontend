import React from 'react';
import './MoviesCard.css';
import noPhoto from '../../images/no-photo.jpg';
import { FILMS_IMAGES_DOMAIN } from '../../utils/constants';
import { pluralize } from '../../utils/helpers';

function MoviesCard(props) {
  const buttonTitle = props.film.saved ? '' : 'Сохранить';
  const buttonClass = props.film.saved ? 'movies__button movies__button_state_active' : 'movies__button';
  const imageLink = !props.film.image.url ? `${FILMS_IMAGES_DOMAIN}${props.film.image}` : `${FILMS_IMAGES_DOMAIN}${props.film.image.url}`;

  function handleClick() {
    if (props.film.saved) {
      props.handleDelete(props.film);
    } else if (!props.savedTemplate) {
      props.onFilmLike(props.film);
    }
  }

  return (
    <article className="movies__movie">
      <div className="movies__header">
        <h2 className="movies__title">{props.film.nameRU}</h2>
        <p className="movies__length">{props.film.duration} {pluralize(['минута', 'минуты', 'минут'], props.film.duration)}</p>
      </div>
      <a href={props.film.trailerLink} target="_blank" rel="noreferrer">
        <img className="movies__poster" src={!imageLink ? noPhoto : imageLink} alt={props.film.nameRU} />
      </a>
      <div className="movies__footer">
        {props.savedTemplate ? <button className="movies__button movies__button_type_remove" onClick={handleClick} type="button"></button> : <button className={buttonClass} onClick={handleClick} type="button">{buttonTitle}</button>}
      </div>
    </article>
  );
}

export default MoviesCard;
