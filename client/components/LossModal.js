import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const LossModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Oops!</Modal.Title>
      </Modal.Header>
      <Modal.Body>You lost the game. Try again?</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LossModal;
