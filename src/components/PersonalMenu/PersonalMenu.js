import React from 'react';
import { NavLink } from 'react-router-dom';
import './PersonalMenu.css';

function PersonalMenu(props) {
  const themeClassName = props.isMainPage ? 'navbar__personal-item_theme_dark' : '';
  if (props.loggedIn) {
    return (
      <nav className="navbar__menu navbar__menu_type_profile">
        <NavLink className={`navbar__personal-item navbar__personal-item_type_profile ${themeClassName}`} to="/profile">Аккаунт</NavLink>
      </nav>
    );
  }
  return (
    <div className="navbar__menu">
      <NavLink className={`navbar__personal-item ${themeClassName}`} to="/signup">Регистрация</NavLink>
      <NavLink className={`navbar__personal-item navbar__personal-item_type_login ${themeClassName}`} to="/signin">Войти</NavLink>
    </div>
  );
}

export default PersonalMenu;
