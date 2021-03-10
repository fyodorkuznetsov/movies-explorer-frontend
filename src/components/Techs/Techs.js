import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import './Techs.css';

function Techs(props) {
  return (
    <section className="technologies">
      <SectionTitle text={props.content.title} />
      <div className="technologies__content">
        <h3 className="technologies__title">{props.content.subtitle}</h3>
        <p className="technologies__subtitle">{props.content.description}</p>
        <ul className="technologies__list">
          {props.content.technologies.map((item, i) => (
            <li key={i} className="technologies__item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Techs;
