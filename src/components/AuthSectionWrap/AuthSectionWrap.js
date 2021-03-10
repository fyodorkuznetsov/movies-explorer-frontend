import React from 'react';
import { NavLink } from 'react-router-dom';
import FormErrorNotifier from '../FormErrorNotifier/FormErrorNotifier';
import './AuthSectionWrap.css';
import logo from '../../images/logo.svg';

function AuthSectionWrap(props) {
  const buttonClass = `auth-section__btn ${props.buttonClass ? props.buttonClass : ''}`;

  return (
    <main className="auth-section">
      <div className="auth-section__header">
        <NavLink className="auth-section__logo" to="/">
          <img src={logo} alt="Проект поиска фильмов" />
        </NavLink>
        <h1 className="auth-section__title">{props.title}</h1>
      </div>
      <form className="auth-section__form" action="#" encType="multipart/form-data" method="POST">
        <div className="auth-section__form-body">
          {props.children}
          <FormErrorNotifier text={props.errorText} authType={true} />
        </div>
        <div className="auth-section__form-footer">
          <button type="submit" className={`auth-section__button ${buttonClass}`} disabled={props.buttonDisabled}>{props.buttonText}</button>
          <p className="auth-section__bottom-info">
            {props.bottomInfo}
            <a href={props.bottomLink} className="auth-section__bottom-link">{props.bottomLinkTitle}</a>
          </p>
        </div>
      </form>
    </main>
  );
}

export default AuthSectionWrap;
