import React from 'react';
import AuthSectionWrap from '../AuthSectionWrap/AuthSectionWrap';
import AuthFormInput from '../AuthFormInput/AuthFormInput';
import './Login.css';

function Login() {
  /*  подготовка инпутов для работы с api */
  const [email, setEmail] = React.useState('pochta@yandex.ru');
  const [password, setPassword] = React.useState('');

  return (
    <AuthSectionWrap title="Рады видеть!" buttonText="Войти" bottomInfo="Ещё не зарегистрированы?" bottomLink="/signup" bottomLinkTitle="Регистрация">
      <AuthFormInput title="E-mail" name="email" type="email" required="true" placeholder="default@yandex.ru" value={email} onChange={setEmail} />
      <AuthFormInput title="Пароль" name="password" type="password" required="true" placeholder="******" error={true} value={password} onChange={setPassword} />
    </AuthSectionWrap>
  );
}

export default Login;
