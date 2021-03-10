import React from 'react';
import './AuthFormInput.css';

function AuthFormInput(props) {
  const changeHandler = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <fieldset className="auth-section__input-wrap">
      <label className="auth-section__input-title">{props.title}</label>
      <input name={props.name} className={`auth-section__input ${props.error ? 'auth-section__input_state_error' : ''}`} onChange={changeHandler} type={props.type} required={props.required} placeholder={props.placeholder} value={props.value} />
    </fieldset>
  );
}

export default AuthFormInput;
