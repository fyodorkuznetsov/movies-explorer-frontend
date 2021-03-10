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
import { footerContent } from '../../utils/staticContent';
import { headerAllowedPathList, footerAllowedPathList } from '../../utils/constants';
import './App.css';

function App() {
  const history = useHistory();

  const goToPreviousPage = () => {
    history.goBack();
  };

  /*  заглушки: авторизован в разделах movies, saved-movies, profile,
  для авторизованного - темная тема меню учитывается на главной */
  const [isMainPage, setIsMainPage] = React.useState(history.location.pathname === '/');
  /*  заглушка до интеграции с api */
  const [loggedIn, setIsLoggedIn] = React.useState(history.location.pathname === '/movies' || history.location.pathname === '/profile' || history.location.pathname === '/saved-movies');
  const [isHeaderAllowed, setIsHeaderAllowed] = React.useState(
    headerAllowedPathList.includes(history.location.pathname),
  );
  const [isFooterAllowed, setIsFooterAllowed] = React.useState(
    footerAllowedPathList.includes(history.location.pathname),
  );

  const handleRouteChange = () => {
    setIsMainPage(history.location.pathname === '/');
    setIsHeaderAllowed(headerAllowedPathList.includes(history.location.pathname));
    setIsFooterAllowed(footerAllowedPathList.includes(history.location.pathname));
    /*  заглушка до интеграции с api */
    /*  для проверки вёрстки навигации авторизованного на главной
    добавить || history.location.pathname === '/' в условие) */
    setIsLoggedIn(history.location.pathname === '/movies' || history.location.pathname === '/profile' || history.location.pathname === '/saved-movies');
  };

  React.useEffect(() => {
    handleRouteChange();
  }, [history.location.pathname]);

  return (
    <div className="content">
      <Header loggedIn={loggedIn} isMainPage={isMainPage} showAllowed={isHeaderAllowed} />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route>
          <NotFound backNavigationHandler={goToPreviousPage} />
        </Route>
      </Switch>
      <Footer content={footerContent} showAllowed={isFooterAllowed} />
    </div>
  );
}

export default withRouter(App);
