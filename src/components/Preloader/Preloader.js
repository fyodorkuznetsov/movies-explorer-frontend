import React from 'react';
import './Preloader.css';

function Preloader(props) {
  if (props.show) {
    return (
      <div className="preloader">
        <div className="preloader__container">
          <span className="preloader__round"></span>
        </div>
      </div>
    );
  }
  return null;
}

export default Preloader;
