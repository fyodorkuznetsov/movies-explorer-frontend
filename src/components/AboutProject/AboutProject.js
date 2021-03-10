import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import './AboutProject.css';

function AboutProject(props) {
  return (
    <section className="about">
      <SectionTitle text={props.title} />
      <ul className="about__columns">
        {
          props.columnContent.map((column, i) => <li key={i} className="about__column">
              <h3 className="about__column-title">{column.title}</h3>
              <p className="about__column-description">{column.description}</p>
            </li>)}
      </ul>
      <div className="about__timeline">
        <div className="about__timeline-item about__timeline-item_type_small">
          <p className="about__timeline-title about__timeline-title_type_colored">{props.timelineContent.first.title}</p>
          <p className="about__timeline-description">{props.timelineContent.first.description}</p>
        </div>
        <div className="about__timeline-item">
          <p className="about__timeline-title">{props.timelineContent.second.title}</p>
          <p className="about__timeline-description">{props.timelineContent.second.description}</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
