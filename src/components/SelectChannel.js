import React from "react";
import styled from "styled-components";

import { GrAdd } from "react-icons/gr";
import { AiOutlineComment } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import ModalComponent from "./ModalComponent";
const SelectChannel = ({ addChannel }) => {
  const [showModal, setShowModal] = useState("");
  return (
    <Container>
      <AiOutlineComment size="9rem" />
      <h1>Create or select a Channel</h1>
      <GrAdd onClick={() => setShowModal(true)} size="3rem" />
      <ModalComponent
        addChannel={addChannel}
        setIsOpen={setShowModal}
        isOpen={showModal}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin: 10px 0;
  }
`;

export default SelectChannel;
