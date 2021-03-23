import React from 'react';
import './AuthFormInput.css';

function AuthFormInput(props) {
  return (
    <fieldset className="auth-section__input-wrap">
      <label className="auth-section__input-title">{props.title}</label>
      <input name={props.name} className={`auth-section__input ${props.error_text ? 'auth-section__input_state_error' : ''}`}
        onChange={props.onChange} type={props.type} required={props.required}
        minLength={props.minLength} placeholder={props.placeholder} value={props.value}
        pattern={props.pattern} disabled={props.disabled} />
      <p className={`error-notifier ${props.error_text ? '' : 'error-notifier_state_hidden'}`}>{props.error_text}</p>
    </fieldset>
  );
}

export default AuthFormInput;
