import React from 'react';
import ProfileEditForm from '../ProfileEditForm/ProfileEditForm';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import InfoTooltip from '../InfoTooltIp/InfoTooltip';
import './Profile.css';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="profile">
      <h1 className="profile__name">{`Привет, ${currentUser.name}!`}</h1>
      <ProfileEditForm submitHandler={props.submitHandler} apiErrorText={props.apiError}
        handleLogout={props.handleLogout} />
      <InfoTooltip isOpened={props.isInfoToolTipOpened} resultText={props.infoTooltipMessage}
        onClose={props.closeInfoTooltip} />
    </main>
  );
}

export default Profile;
