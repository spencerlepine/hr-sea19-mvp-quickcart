import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

/* eslint-disable */
const Popup = ({ children, togglePopup }) => {
  return (
    <figure className="popup">
      <Modal.Dialog>
        <Modal.Header closeButton onClick={togglePopup}>
        </Modal.Header>

        {children}
      </Modal.Dialog>
    </figure>
  )
};

export default Popup;
