import React from 'react';
import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.svg';
import './Header.css';

function Header(props) {
  const headerClass = props.isMainPage ? 'header header_theme_dark' : 'header';
  const burgerClass = props.isMainPage ? 'header__menu-button_theme_dark' : '';
  const [mobileMenuVisible, setMobileMenuVisible] = React.useState(false);

  const toggleMobuleMenuVisibility = () => {
    const mobileNavBar = document.querySelector('.navbar_type_authorized');
    setMobileMenuVisible(!mobileMenuVisible);
    if (mobileNavBar) {
      mobileNavBar.classList.toggle('navbar_state_visible');
    }
  };

  if (props.showAllowed) {
    return (
      <header className={headerClass}>
        <NavLink className="header__logo" to="/">
          <img src={logo} alt="Проект поиска фильмов" />
        </NavLink>
        <div className={`header__menu-overlay ${mobileMenuVisible ? 'header__menu-overlay_state_visible' : ''}`} onClick={toggleMobuleMenuVisibility}></div>
        {props.loggedIn ? <div className="header__menu"><Navigation loggedIn={props.loggedIn} isMainPage={props.isMainPage} closeMenuHandler={toggleMobuleMenuVisibility} /></div> : <Navigation loggedIn={props.loggedIn} isMainPage={props.isMainPage} closeMenuHandler={toggleMobuleMenuVisibility}/>}
        {props.loggedIn ? <button className={`header__menu-button ${burgerClass}`} type="button" onClick={toggleMobuleMenuVisibility}></button> : ''}
      </header>
    );
  }
  return null;
}

export default Header;
