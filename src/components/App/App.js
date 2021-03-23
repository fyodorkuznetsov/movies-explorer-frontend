import React from 'react';
import {
  Route,
  Switch,
  withRouter,
  useHistory,
} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import MovieFormatter from '../../utils/MovieFormatter';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import { footerContent } from '../../utils/staticContent';
import { HEADER_ALLOWER_PATH_LIST, FOOTER_ALLOWED_PATH_LIST } from '../../utils/constants';
import { addSavedFilmToStorage, removeSavedFilmFromStorage } from '../../utils/helpers';

import * as mainApiMethods from '../../utils/MainApi';
import getFilmList from '../../utils/MoviesApi';

import './App.css';

function App() {
  const history = useHistory();

  const goToPreviousPage = () => {
    history.goBack();
  };

  const [isMainPage, setIsMainPage] = React.useState(history.location.pathname === '/');
  const [apiError, setApiError] = React.useState('');
  const [infoTooltipMessage, setInfoTooltipMessage] = React.useState('');
  const [isInfoToolTipOpened, setIsInfoToolTipOpened] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  /*  отключение инпутов при отправке запросов */
  const [disabledInputs, setDisabledInputs] = React.useState(false);

  const [isPendingFilmRequest, setIsPendingFilmRequest] = React.useState(false);

  const [isHeaderAllowed, setIsHeaderAllowed] = React.useState(
    HEADER_ALLOWER_PATH_LIST.includes(history.location.pathname),
  );
  const [isFooterAllowed, setIsFooterAllowed] = React.useState(
    FOOTER_ALLOWED_PATH_LIST.includes(history.location.pathname),
  );

  /* стейт для блокировки отрисовки контента до проверки токена */
  const [tokenChecked, setTokenChecked] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const movieListFormatter = new MovieFormatter();

  const handleTokenCheck = () => {
    mainApiMethods.checkToken()
      .then((res) => {
        if (res.data) {
          if (res.data.email) {
            setCurrentUser(res.data);
          }
          setLoggedIn(true);
          setTokenChecked(true);
          /*  если пользователь авторизован и обратился к странице регистрации/авторизации
          редирект на /movies */
          if (history.location.pathname === '/signup' || history.location.pathname === '/signin') {
            history.push('/movies');
          }
        } else {
          setLoggedIn(false);
          setTokenChecked(true);
        }
      })
      .catch((err) => err);
  };

  const handleRouteChange = () => {
    setIsMainPage(history.location.pathname === '/');
    setIsHeaderAllowed(HEADER_ALLOWER_PATH_LIST.includes(history.location.pathname));
    setIsFooterAllowed(FOOTER_ALLOWED_PATH_LIST.includes(history.location.pathname));
    /* Обнуление общего текста ошибки Api если пользователь ушел с формы в другие разделы */
    setApiError('');
  };

  const closeInfoTooltip = () => {
    setIsInfoToolTipOpened(false);
  };

  const handleRegister = (email, password, name, onSuccess) => {
    if (!email || !password || !name) {
      return;
    }
    setDisabledInputs(true);
    mainApiMethods.register(email, password, name, onSuccess)
      .then((result) => {
        setDisabledInputs(false);
        if (result.error) {
          setApiError(result.error);
        } else if (result.data && result.data.email) {
          setApiError('');
          history.push('/movies');
        }
      })
      .catch((err) => {
        setDisabledInputs(false);
        setApiError(err.message);
      });
  };

  const handleLogin = (email, password) => {
    if (!email || !password) {
      return;
    }
    setDisabledInputs(true);
    mainApiMethods.login(email, password)
      .then((result) => {
        setDisabledInputs(false);
        if (result.error) {
          setApiError(result.error);
        } else {
          history.push('/movies');
        }
      })
      .catch((err) => {
        setDisabledInputs(false);
        setApiError(err.message);
      });
  };

  const handleUpdateProfile = (name, email, onSuccess = null) => {
    if (!email || !name) {
      return;
    }
    setDisabledInputs(true);
    mainApiMethods.updateUserProfile(name, email)
      .then((result) => {
        setDisabledInputs(false);
        if (result.error) {
          setApiError(result.error);
        } else if (result.data && result.data.email) {
          setApiError('');
          setInfoTooltipMessage('Ваш профиль успешно изменён!');
          setIsInfoToolTipOpened(true);
          setCurrentUser(result.data);
          if (onSuccess) {
            onSuccess();
          }
        }
      })
      .catch((err) => {
        setDisabledInputs(false);
        setApiError(err.message);
      });
  };

  const handleLogout = () => {
    mainApiMethods.logout()
      .then((result) => {
        if (!result.error) {
          history.push('/');
        }
      })
      .catch((err) => err);
  };

  const handleFilmLike = (film, updateSavedFilms, reRenderAction) => {
    const formattedFilm = {
      movieId: film.id,
      director: film.director,
      duration: film.duration,
      description: film.description,
      image: film.image.url ? film.image.url : '',
      nameRU: film.nameRU,
    };
    if (film.trailer) {
      formattedFilm.trailer = film.trailerLink;
    }
    if (film.image.formats.thumnail) {
      formattedFilm.thumbnail = film.image.formats.thumnail;
    }
    if (film.county) {
      formattedFilm.country = film.country;
    }
    if (film.nameEN) {
      formattedFilm.nameEN = film.nameEN;
    }
    mainApiMethods.saveFilm(formattedFilm)
      .then((result) => {
        if (!result.error && result.data) {
          addSavedFilmToStorage(result.data, updateSavedFilms);
          reRenderAction();
        }
      })
      .catch((err) => err);
  };

  const handleFilmDelete = (film, updateSavedFilms, reRenderAction) => {
    mainApiMethods.removeFilm(film._id)
      .then((result) => {
        if (!result.error && result.data) {
          removeSavedFilmFromStorage(result.data, updateSavedFilms);
          reRenderAction();
        }
      })
      .catch((err) => err);
  };

  const getSavedFilmsRequest = (setFilmState) => {
    const savedFilmList = localStorage.getItem('saved-films');
    if (!savedFilmList) {
      mainApiMethods.getSavedFilmList()
        .then((result) => {
          if (result.error && !result) {
            setApiError(result.error);
          } else {
            localStorage.setItem('saved-films', JSON.stringify(result));
            setFilmState(result);
          }
        })
        .catch((err) => err);
    } else {
      const savedFilmListDecoded = JSON.parse(savedFilmList);
      setFilmState([...savedFilmListDecoded]);
    }
  };

  const getAllFilmsRequest = (setFilmState) => {
    const localFilmList = localStorage.getItem('films');
    if (!localFilmList) {
      setIsPendingFilmRequest(true);
      getFilmList()
        .then((result) => {
          setIsPendingFilmRequest(false);
          if (result.error) {
            setApiError(result.error);
          } else {
            const remoteFilmList = result;
            localStorage.setItem('films', JSON.stringify(remoteFilmList));
            setFilmState(remoteFilmList);
          }
        })
        .catch(() => {
          setIsPendingFilmRequest(false);
        });
    }
    const filmListDecoded = JSON.parse(localFilmList);
    setFilmState(filmListDecoded);
  };

  React.useEffect(() => {
    handleTokenCheck();
    handleRouteChange();
  }, [history.location.pathname]);

  return (
    tokenChecked && <CurrentUserContext.Provider value={currentUser}>
      <div className="content">
        <Header loggedIn={loggedIn} isMainPage={isMainPage} showAllowed={isHeaderAllowed} />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin} apiError={apiError} disableInputs={disabledInputs} />
          </Route>
          <Route path="/signup">
            <Register onRegister={handleRegister} apiError={apiError}
              disableInputs={disabledInputs} />
          </Route>
          <ProtectedRoute loggedIn={loggedIn} path="/movies" component={Movies} formatter={movieListFormatter} getFilmRequest={getAllFilmsRequest}
            errorText={apiError} isPendingRequest={isPendingFilmRequest}
            handleFilmLike={handleFilmLike} onMount={getSavedFilmsRequest}
            handleFilmDelete={handleFilmDelete} />
          <ProtectedRoute loggedIn={loggedIn} path="/saved-movies" component={SavedMovies} onMount={getSavedFilmsRequest}
            formatter={movieListFormatter} handleFilmDelete={handleFilmDelete} />
          <ProtectedRoute loggedIn={loggedIn} path="/profile" component={Profile} infoTooltipMessage={infoTooltipMessage}
            isInfoToolTipOpened={isInfoToolTipOpened} closeInfoTooltip={closeInfoTooltip}
            disableInputs={disabledInputs} apiError={apiError} handleLogout={handleLogout}
            submitHandler={handleUpdateProfile} />
          <Route>
            <NotFound backNavigationHandler={goToPreviousPage} />
          </Route>
        </Switch>
        <Footer content={footerContent} showAllowed={isFooterAllowed} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
