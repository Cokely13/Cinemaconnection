import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const WrongModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        {/* <Modal.Title>Wrong!</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>WRONG!</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WrongModal;
