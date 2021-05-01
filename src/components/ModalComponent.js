import React from "react";
import Modal from "react-bootstrap/Modal";

import Button from "react-bootstrap/Button";
import styled from "styled-components";

import { useState } from "react";

const ModalComponent = ({ isOpen, setIsOpen, addChannel }) => {
  const [input, setInput] = useState();
  const [inputDesc, setInputDesc] = useState();

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
        <InputDesc
          value={inputDesc}
          onChange={(e) => setInputDesc(e.target.value)}
          placeholder="Channel Description"
          name="input"
          type="text"
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsOpen(false)}>
          Close
        </Button>
        <Button
          type="submit"
          onClick={() => {
            addChannel({ name: input, desc: inputDesc });
            setInput("");
            setInputDesc("");
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
const InputDesc = styled.input`
  width: 100%;
  height: 35px;
  margin-top: 15px;
  border: 0;
  outline: 0;
  -webkit-box-shadow: 0px 0px 5px -3px #d1d1d1;
  box-shadow: 0px 0px 5px 3px #d1d1d1;
  padding: 0 15px;
`;
export default ModalComponent;
