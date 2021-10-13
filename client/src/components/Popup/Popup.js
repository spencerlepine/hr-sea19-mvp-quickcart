import React from 'react';

/* eslint-disable */
const Popup = ({ children, togglePopup }) => {
  return (
    <figure className="popup">
      {children}
      <button onClick={togglePopup} className="popupClose">X</button>
    </figure>
  )
};

export default Popup;
