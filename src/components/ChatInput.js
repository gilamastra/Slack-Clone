import React, { useState } from "react";
import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";

const ChatInput = ({ sendMessage }) => {
  const [input, setInput] = useState("");

  const send = (e) => {
    e.preventDefault();
    if (input) {
      sendMessage(input);
      setInput("");
    } else return;
  };

  return (
    <Container>
      <InputContainer>
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

const Container = styled.div`
  padding: 0 20px 24px 20px;
`;
const InputContainer = styled.div`
  border: 1px solid #8d8d8e;
  border-radius: 4px;

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

const Send = styled(SendIcon)`
  color: #d9d9d9;
`;
