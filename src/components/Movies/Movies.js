import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCardListPagination from '../MoviesCardListPagination/MoviesCardListPagination';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import { guessPageElementCount } from '../../utils/helpers';
import './Movies.css';

function Movies(props) {
  const [films, setFilms] = React.useState([]);
  const [savedFilms, setSavedFilms] = React.useState([]);
  const [loadMoreCount, setLoadMoreCount] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
  const [makeRequest, doMakeRequest] = React.useState(0);
  const [showPagination, setShowPagination] = React.useState(false);

  React.useEffect(
    () => {
      props.onMount(setSavedFilms);
      guessPageElementCount(setPageCount, setLoadMoreCount);
    },
    [],
  );

  React.useEffect(
    () => {
      const updatedSaveFlagFilms = films.map((item) => {
        const newItem = item;
        const savedItemCopy = savedFilms.find((savedItem) => savedItem.movieId === item.id);
        if (savedItemCopy) {
          newItem.saved = true;
          newItem._id = savedItemCopy._id;
        } else {
          newItem.saved = false;
          newItem._id = null;
        }
        return newItem;
      });
      setFilms([...updatedSaveFlagFilms]);
    },
    [makeRequest, savedFilms],
  );

  /* props.formatter - объект класса MovieFormatter, отвечает за обновление списка карточек
  после фильтрации, подгрузку при клике на "еще" и ресайз эвент */

  /* сабмит формы фильтра */
  function handleSearch(phraseFilter, isShortFilter) {
    if (!props.formatter.allFilms || props.formatter.allFilms.length <= 0) {
      props.getFilmRequest(
        (allFilmList) => {
          doMakeRequest();
          if (allFilmList) {
            props.formatter.setAllFilms(allFilmList);
            const formatterResult = props.formatter.processFilter(
              phraseFilter,
              isShortFilter,
              pageCount,
            );
            setFilms(formatterResult.films);
            setShowPagination(formatterResult.showPagination);
          } else {
            setFilms([]);
          }
        },
      );
    } else {
      const formatterResult = props.formatter.processFilter(
        phraseFilter,
        isShortFilter,
        pageCount,
      );
      setFilms(formatterResult.films);
      setShowPagination(formatterResult.showPagination);
      doMakeRequest();
    }
  }

  /* подгрузка карточек */
  function loadMore() {
    const formatterResult = props.formatter.processLoadMore(
      films,
      loadMoreCount,
    );
    setFilms(formatterResult.films);
    setShowPagination(formatterResult.showPagination);
    doMakeRequest();
  }

  /* смена кол-ва отображения и подгрузки карточек
  в зависимости от ширины согласно брифу */
  function callResizeEventHandler() {
    props.formatter.windowResizeEventHandler({
      setPageCount, setLoadMoreCount,
    });
  }
  window.addEventListener('resize', callResizeEventHandler);

  function handleDelete(card) {
    props.handleFilmDelete(card, setSavedFilms, doMakeRequest);
  }

  function handleLike(card) {
    props.handleFilmLike(card, setSavedFilms, doMakeRequest);
  }

  return (
    <main className="film-wrap">
      <SearchForm handleSearch={handleSearch} />
      <Preloader show={props.isPendingRequest} />
      <MoviesCardList films={films} errorText={props.errorText}
        handleDelete={handleDelete} onFilmLike={handleLike} />
      <MoviesCardListPagination show={showPagination} onClick={loadMore} />
    </main>
  );
}

export default Movies;
