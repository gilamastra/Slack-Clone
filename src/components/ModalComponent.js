import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

import { useState } from "react";

const ModalComponent = ({ isOpen, setIsOpen, addChannel }) => {
  const [input, setInput] = useState();

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  return (
    <Modal show={isOpen} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create Channel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Channel Name"
          name="input"
          type="text"
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={() => setIsOpen(false)}>
          Close
        </Button>
        <Button
          type="submit"
          onClick={() => {
            addChannel(input);
            setInput("");
            setIsOpen(false);
          }}
          variant="primary"
        >
          Create Channel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
const Input = styled.input`
  width: 100%;
  height: 45px;
  border: 0;
  outline: 0;
  -webkit-box-shadow: 0px 0px 5px -3px #d1d1d1;
  box-shadow: 0px 0px 5px 3px #d1d1d1;
  padding: 0 15px;
`;
export default ModalComponent;
