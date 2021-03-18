import React from 'react';
import AuthSectionWrap from '../AuthSectionWrap/AuthSectionWrap';
import AuthFormInput from '../AuthFormInput/AuthFormInput';
import UseFormWithValidation from '../UseFormWithValidation/UseFormWithValidation';
import './Register.css';

function Register(props) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = UseFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password } = values;
    props.onRegister(name, email, password, resetForm);
  }

  return (
    <AuthSectionWrap title="Добро пожаловать!" buttonText="Зарегистрироваться" bottomInfo="Уже зарегистрированы?" bottomLink="/signin" bottomLinkTitle="Войти" valid={isValid} errorText={props.apiError} onSubmit={handleSubmit} >
      <AuthFormInput title="Имя" name="name" minLength="2" type="text" required={true} placeholder="Иван Иванов" value={values.name || ''} onChange={handleChange} error_text={errors.name} pattern="^[а-яА-ЯёЁa-zA-Z- ]+$" disabled={props.disableInputs}/>
      <AuthFormInput title="E-mail" name="email" type="email" required={true} placeholder="default@yandex.ru" value={values.email || ''} onChange={handleChange} error_text={errors.email} pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}" disabled={props.disableInputs}/>
      <AuthFormInput title="Пароль" name="password" minLength="8" type="password" required={true} placeholder="******" value={values.password || ''} onChange={handleChange} error_text={errors.password} disabled={props.disableInputs}/>
    </AuthSectionWrap>
  );
}

export default Register;
