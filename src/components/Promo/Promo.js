import React from 'react';
import NavTab from '../NavTab/NavTab';
import './Promo.css';

function Promo(props) {
  return (
    <section className="promo">
      <div className="promo__text-info">
        <h1 className="promo__title">{props.title}</h1>
        <p className="promo__description">{props.description}</p>
        <NavTab scrollToClass="about" />
      </div>
      <img className="promo__picture" src={props.pictureSrc} alt={props.title} />
    </section>
  );
}

export default Promo;
