import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ErrorModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Oops!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Can Not Select More than 4 Names</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
