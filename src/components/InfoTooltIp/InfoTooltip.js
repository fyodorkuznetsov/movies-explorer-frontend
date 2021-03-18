import React from 'react';
import './InfoTooltip.css';

function InfoTooltip(props) {
  const popupClass = `popup popup_type_info${props.isOpened ? ' popup_state_opened' : ''}`;

  return (
    <section className={popupClass}>
      <div className="popup__container">
        <figure className="popup__info-icon"></figure>
        <p className="popup__info-text">{props.resultText}</p>
        <button type="button" className="popup__close-btn" onClick={props.onClose}></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
