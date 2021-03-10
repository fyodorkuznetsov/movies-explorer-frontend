import React from 'react';
import './NavTab.css';

function NavTab(props) {
  function scrollToBlock() {
    if (props.scrollToClass) {
      const targetBlock = document.querySelector(`.${props.scrollToClass}`);
      if (targetBlock) {
        targetBlock.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  return (
    <button type="button" className="tab-button" onClick={scrollToBlock}>Узнать больше</button>
  );
}

export default NavTab;
