import React from 'react';
import AuthSectionWrap from '../AuthSectionWrap/AuthSectionWrap';
import AuthFormInput from '../AuthFormInput/AuthFormInput';
import './Register.css';

function Register() {
  /*  подготовка инпутов для работы с api,
  передан класс невалидного инпута для демонстрации вёрстки */
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('123456');

  return (
    <AuthSectionWrap title="Добро пожаловать!" buttonText="Зарегистрироваться" bottomInfo="Уже зарегистрированы?" bottomLink="/signin" bottomLinkTitle="Войти" errorText="Что-то пошло не так...">
      <AuthFormInput title="Имя" name="name" type="text" required="true" placeholder="Иван Иванов" value={name} onChange={setName} />
      <AuthFormInput title="E-mail" name="email" type="email" required="true" placeholder="default@yandex.ru" value={email} onChange={setEmail} />
      <AuthFormInput title="Пароль" name="password" type="password" required="true" placeholder="******" error={true} value={password} onChange={setPassword} />
    </AuthSectionWrap>
  );
}

export default Register;
