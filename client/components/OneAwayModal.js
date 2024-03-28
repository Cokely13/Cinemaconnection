import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const OneAwayModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Wrong!</Modal.Title>
      </Modal.Header>
      <Modal.Body>But Only One Away!</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OneAwayModal;
