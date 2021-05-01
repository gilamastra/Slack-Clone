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
      <CommentIcon />
      <h1>Create or select a Channel</h1>
      <GrIcon cursor="pointer" onClick={() => setShowModal(true)} />
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
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin: 10px 0;
    text-align: center;

    @media screen and (max-width: 1024px) {
      font-size: 24px;
    }
    @media screen and (max-width: 768px) {
      font-size: 18px;
    }
  }
`;

const CommentIcon = styled(AiOutlineComment)`
  font-size: 120px;
  @media screen and (max-width: 768px) {
    font-size: 80px;
  }
`;
const GrIcon = styled(GrAdd)`
  font-size: 50px;
  @media screen and (max-width: 768px) {
    font-size: 30px;
  }
`;

export default SelectChannel;
