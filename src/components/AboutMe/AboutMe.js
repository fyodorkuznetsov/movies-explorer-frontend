import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import './AboutMe.css';

function AboutMe(props) {
  return (
    <section className="about-me">
      <SectionTitle text={props.content.title} />
      <div className="about-me__content">
        <div className="about-me__text">
          <h3 className="about-me__name">{props.content.name}</h3>
          <h4 className="about-me__summary">{props.content.summary}</h4>
          <p className="about-me__description">{props.content.description}</p>
          <ul className="about-me__links">
            {
              props.content.links.map((link, i) => <li key={i} className="about-me__link-item">
                <a href={link.href} className="about-me__link" target="_blank" rel="noreferrer">{link.title}</a>
              </li>)}
          </ul>
        </div>
        <img className="about-me__picture" src={props.content.photo} alt={props.content.name}/>
      </div>
    </section>
  );
}

export default AboutMe;
