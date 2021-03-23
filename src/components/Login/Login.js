import React from 'react';
import AuthSectionWrap from '../AuthSectionWrap/AuthSectionWrap';
import AuthFormInput from '../AuthFormInput/AuthFormInput';
import UseFormWithValidation from '../UseFormWithValidation/UseFormWithValidation';
import './Login.css';

function Login(props) {
  const {
    values,
    handleChange,
    errors,
    isValid,
  } = UseFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = values;
    props.onLogin(email, password);
  }

  return (
    <AuthSectionWrap title="Рады видеть!" buttonText="Войти" bottomInfo="Ещё не зарегистрированы?" bottomLink="/signup" bottomLinkTitle="Регистрация" valid={isValid} errorText={props.apiError} onSubmit={handleSubmit}>
      <AuthFormInput title="E-mail" name="email" type="email" required={true} placeholder="default@yandex.ru" value={values.email || ''}
        onChange={handleChange} error_text={errors.email} pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}" disabled={props.disableInputs} />
      <AuthFormInput title="Пароль" minLength="8" name="password" type="password" required={true} placeholder="******" value={values.password || ''} onChange={handleChange} error_text={errors.password} disabled={props.disableInputs} />
    </AuthSectionWrap>
  );
}

export default Login;
