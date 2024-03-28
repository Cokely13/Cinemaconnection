import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const WinModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Congratulations!</Modal.Title>
      </Modal.Header>
      <Modal.Body>You won the game!</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Play Again
        </Button>
        <Button variant="primary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WinModal;
