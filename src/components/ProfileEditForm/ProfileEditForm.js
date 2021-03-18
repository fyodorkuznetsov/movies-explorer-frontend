import React from 'react';
import FormErrorNotifier from '../FormErrorNotifier/FormErrorNotifier';
import UseFormWithValidation from '../UseFormWithValidation/UseFormWithValidation';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './ProfileEditForm.css';

function ProfileEditForm(props) {
  const [isEditMode, setIsEditMode] = React.useState(false);
  /*  Отключение сохранения до изменения данных формы */
  const [isSaveDisabled, setIsSaveDisabled] = React.useState(true);
  const [nameChanged, setIsNameChanged] = React.useState(false);
  const [emailChanged, setIsEmailChanged] = React.useState(false);

  const currentUser = React.useContext(CurrentUserContext);

  const {
    values,
    handleChange,
    errors,
    isValid,
  } = UseFormWithValidation({ name: currentUser.name, email: currentUser.email });

  function enableEditMode() {
    setIsEditMode(true);
    setIsEmailChanged(false);
    setIsNameChanged(false);
  }

  function inputChangeHandler(e) {
    handleChange(e);
    if (e.target.name === 'email') {
      setIsEmailChanged(e.target.value !== currentUser.email);
    } else if (e.target.name === 'name') {
      setIsNameChanged(e.target.value !== currentUser.name);
    }
  }

  React.useEffect(() => {
    setIsSaveDisabled((!nameChanged && !emailChanged) || !isEditMode);
  }, [nameChanged, emailChanged]);

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email } = values;
    props.submitHandler(name, email, () => { setIsSaveDisabled(true); setIsEditMode(false); });
  }

  return (
    <form className="profile__form" onSubmit={handleSubmit} action="#" encType="multipart/form-data" method="POST" noValidate>
      <fieldset className="profile__field-wrap">
        <label className="profile__field-name">Имя</label>
        <input type="text" name="name" className="profile__field-input" value={values.name} onChange={inputChangeHandler} disabled={!isEditMode} placeholder="Имя пользователя" required pattern="^[а-яА-ЯёЁa-zA-Z- ]+$"/>
        <p className={`error-notifier ${errors.name ? '' : 'error-notifier_state_hidden'}`}>{errors.name}</p>
      </fieldset>
      <fieldset className="profile__field-wrap">
        <label className="profile__field-name">Почта</label>
        <input type="email" name="email" className="profile__field-input" value={values.email} onChange={inputChangeHandler} disabled={!isEditMode} placeholder="pochta@yandex.ru" required pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"/>
        <p className={`error-notifier ${errors.email ? '' : 'error-notifier_state_hidden'}`}>{errors.email}</p>
      </fieldset>
      {
        isEditMode ? <div className="profile__form-footer"><FormErrorNotifier text={props.apiErrorText} /><button type="submit" className={`profile__form-submit ${isSaveDisabled || !isValid ? 'profile__form-submit_state_disabled' : ''}`} disabled={isSaveDisabled}>Сохранить</button></div>
          : <div className="profile__form-footer"><FormErrorNotifier text={props.apiErrorText} /><button type="button" className="profile__form-edit" onClick={enableEditMode}>Редактировать</button>
            <button type="button" className="profile__logout" onClick={props.handleLogout}>Выйти из аккаунта</button></div>
      }
    </form>
  );
}

export default ProfileEditForm;
