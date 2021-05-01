import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";

import SendIcon from "@material-ui/icons/Send";

const ChatInput = ({ sendMessage }) => {
  const [input, setInput] = useState("");
  const [isError, setIsError] = useState(false);

  const send = (e) => {
    e.preventDefault();
    if (input.length > 2700) {
      setIsError(true);
      setInput("");
      return;
    }
    if (input) {
      sendMessage(input);
      setInput("");
    } else return;
  };

  return (
    <Container>
      <InputContainer>
        {isError && (
          <Modal show={isError} onHide={setIsError}>
            <Modal.Header>
              <TitleModal>
                <p>YOUR MESSAGE IS TOO LONG</p>
              </TitleModal>
            </Modal.Header>

            <Body>
              <p>
                Make sure your message is shorter than 2000
                characteres
              </p>
            </Body>

            <Modal.Footer>
              <ButtonModal onClick={() => setIsError(false)}>
                Close
              </ButtonModal>
            </Modal.Footer>
          </Modal>
        )}

        <form>
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
            type="text"
            placeholder="Message here..."
          />
          <SendButton type="submit" onClick={send}>
            <Send />
          </SendButton>
        </form>
      </InputContainer>
    </Container>
  );
};

export default ChatInput;

const TitleModal = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  p {
    font-weight: bold;
    font-size: 20px;
  }
`;
const Body = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;
const Container = styled.div`
  padding: 0 20px 24px 20px;
  width: 100%;
`;
const InputContainer = styled.div`
  border: 1px solid #8d8d8e;
  border-radius: 4px;
  width: 100%;

  form {
    display: flex;
    height: 42px;
    align-items: center;
    padding-left: 10px;

    input {
      height: 100%;
      flex: 1;
      border: 0;
      font-size: 13px;
      outline: 0;
    }
  }
`;

const SendButton = styled.button`
  background: #007a5a;
  border-radius: 2px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 5px;
  border: 0;
  outline: 0;
  .MuiSvgIcon-root {
    width: 18px;
  }
  :hover {
    background: #148567;
  }
`;

const ButtonModal = styled.button`
  width: 100%;
  height: 50px;
  background: #350d36;
  color: white;
`;

const Send = styled(SendIcon)`
  color: #d9d9d9;
`;
