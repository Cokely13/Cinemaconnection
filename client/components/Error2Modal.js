import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const Error2Modal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Oops!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Must Select 4 Names</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Error2Modal;
