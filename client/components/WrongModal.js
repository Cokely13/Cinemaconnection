import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const WrongModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} className="custom-modal">
      <Modal.Header closeButton>
        {/* <Modal.Title>Wrong!</Modal.Title> */}
      </Modal.Header>
      <Modal.Body><h1>WRONG!</h1></Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WrongModal;
