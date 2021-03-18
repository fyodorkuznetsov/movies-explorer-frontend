import {
  MEDIUM_WINDOW_RESOLUTION,
  MIN_WINDOW_RESOLUTION,
  MAX_RESOLUTION_LOAD_MORE,
  MAX_RESOLUTION_PAGE_ELEMENT_COUNT,
  MEDIUM_RESOLUTION_LOAD_MORE,
  MEDIUM_RESOLUTION_PAGE_ELEMENT_COUNT,
  MIN_RESOLUTION_LOAD_MORE,
  MIN_RESOLUTION_PAGE_ELEMENT_COUNT,
} from './constants';

export function guessPageElementCount(setPageCount, setMoreCount) {
  const windowWidth = window.innerWidth;
  if (windowWidth >= MEDIUM_WINDOW_RESOLUTION) {
    setPageCount(MAX_RESOLUTION_PAGE_ELEMENT_COUNT);
    setMoreCount(MAX_RESOLUTION_LOAD_MORE);
  } else if (windowWidth >= MIN_WINDOW_RESOLUTION) {
    setPageCount(MEDIUM_RESOLUTION_PAGE_ELEMENT_COUNT);
    setMoreCount(MEDIUM_RESOLUTION_LOAD_MORE);
  } else if (windowWidth < MIN_WINDOW_RESOLUTION) {
    setPageCount(MIN_RESOLUTION_PAGE_ELEMENT_COUNT);
    setMoreCount(MIN_RESOLUTION_LOAD_MORE);
  }
}

export function pluralize(forms, count) {
  let wordFormKey;
  if (count % 10 === 1 && count % 100 !== 11) {
    wordFormKey = 0;
  } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
    wordFormKey = 1;
  } else {
    wordFormKey = 2;
  }

  return forms[wordFormKey] || '';
}

/* хелпер сохранения фильма в localStorage */
export function addSavedFilmToStorage(film, setState) {
  const savedFilmList = localStorage.getItem('saved-films');
  if (savedFilmList) {
    const newSavedFilms = JSON.parse(savedFilmList);
    newSavedFilms.push({ ...film, saved: true });
    localStorage.setItem('saved-films', JSON.stringify(newSavedFilms));
    setState(newSavedFilms);
  }
}

/* хелпер удаления фильма из localStorage */
export function removeSavedFilmFromStorage(film, setState) {
  const savedFilmList = localStorage.getItem('saved-films');
  if (savedFilmList) {
    const newSavedFilms = JSON.parse(savedFilmList).filter((c) => c.movieId !== film.movieId);
    localStorage.setItem('saved-films', JSON.stringify(newSavedFilms));
    setState(newSavedFilms);
  }
}
