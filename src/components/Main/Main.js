import React from 'react';
import Promo from '../Promo/Promo';
import landingPicture from '../../images/landing-picture.png';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

import {
  promoTitle,
  promoDescription,
  aboutTitle,
  aboutColumns,
  timelineContent,
  technologiesContent,
  aboutMeContent,
  portfolioContent,
} from '../../utils/staticContent';

function Main() {
  return (
    <main>
      <Promo title={promoTitle} description={promoDescription} pictureSrc={landingPicture} />
      <AboutProject title={aboutTitle} columnContent={aboutColumns}
        timelineContent={timelineContent} />
      <Techs content={technologiesContent} />
      <AboutMe content={aboutMeContent} />
      <Portfolio content={portfolioContent} />
    </main>
  );
}

export default Main;
