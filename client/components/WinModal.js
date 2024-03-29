import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Confetti from 'react-confetti'; // Import Confetti component

const WinModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Congratulations!</Modal.Title>
      </Modal.Header>
      <Modal.Body>You won the game!</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WinModal;
