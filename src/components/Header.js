import React from "react";
import styled from "styled-components";
import AcessTimeIcon from "@material-ui/icons/AccessTime";
import HelpOutline from "@material-ui/icons/HelpOutline";
const Header = ({ user, signOut }) => {
  return (
    <Container>
      <Main>
        <AcessTimeIcon />
        <SearchContainer>
          <Search>
            <input type="text" placeholder="Search..." />
          </Search>
        </SearchContainer>
        <HelpOutline />
      </Main>
      <UserContainer>
        <UserImage onClick={signOut}>
          <img
            alt="profileImg"
            src={
              user.photo
                ? user.photo
                : "http://i.imgur.com/6VBx3io.png"
            }
          />
        </UserImage>
      </UserContainer>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  background: #350d36;
  width: 100vw;
  color: white;
  padding: 5px 0;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 1px 0 0 rgb(255 255 255 / 10%);
`;

const Main = styled.div`
  display: flex;
  height: 100%;
`;

const SearchContainer = styled.div`
  margin: 0 16px;
  width: 40vw;
  max-width: 500px;
  min-width: 200px;
`;

const Search = styled.div`
  box-shadow: inset 0 0 0 1px rgb(104 74 104);
  width: 100%;
  border-radius: 8px;

  display: flex;
  align-items: center;
  input {
    background-color: rgb(67, 30, 68);
    border: none;
    border-radius: 4px;
    font-size: 13px;
    width: 100%;
    box-shadow: inset 0 0 0 1px rgb(104 74 104);
    padding: 3px 8px;
    color: white;
    ::placeholder {
      color: #dadada;
    }
  }
  input:focus {
    outline: 0;
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 16px;
  position: absolute;
  right: 0;
`;

const Name = styled.div`
  padding-right: 16px;
`;

const UserImage = styled.div`
  width: 28px;
  height: 28px;
  cursor: pointer;
  img {
    width: 100%;
    border-radius: 4px;
  }
`;
