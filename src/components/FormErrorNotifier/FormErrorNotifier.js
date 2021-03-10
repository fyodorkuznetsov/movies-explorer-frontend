import React from 'react';
import './FormErrorNotifier.css';

function FormErrorNotifier(props) {
  return (
    <p className={`error-notifier ${props.authType ? 'error-notifier_type_auth' : ''}`}>{props.text}</p>
  );
}

export default FormErrorNotifier;
