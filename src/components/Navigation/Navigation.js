import React from 'react';
import PersonalMenu from '../PersonalMenu/PersonalMenu';
import ContentMenu from '../ContentMenu/ContentMenu';
import './Navigation.css';

function Navigation(props) {
  const navBarClass = props.isMainPage && !props.loggedIn ? 'navbar navbar_type_mainpage' : 'navbar';
  const additionalNavbarClass = props.loggedIn ? 'navbar_type_authorized' : '';

  return (
    <div className={`${navBarClass} ${additionalNavbarClass}`}>
      <ContentMenu loggedIn={props.loggedIn} isMainPage={props.isMainPage} />
      <PersonalMenu loggedIn={props.loggedIn} isMainPage={props.isMainPage} />
      {props.loggedIn ? <button className="navbar__close-menu-button" type="button" onClick={props.closeMenuHandler}></button> : ''}
    </div>
  );
}

export default Navigation;
