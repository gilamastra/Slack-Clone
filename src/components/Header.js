import React from "react";
import styled from "styled-components";
import AcessTimeIcon from "@material-ui/icons/AccessTime";
import HelpOutline from "@material-ui/icons/HelpOutline";
const Header = () => {
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
        <Name>Nazary</Name>
        <UserImage>
          <img
            alt="profileImg"
            src="https://image.flaticon.com/icons/png/512/147/147144.png"
          />
        </UserImage>
      </UserContainer>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  background: #350d36;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 1px 0 0 rgb(255 255 255 / 10%);
`;

const Main = styled.div`
  display: flex;
  margin: 0 16px;
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
    border-radius: 8px;

    width: 100%;
    box-shadow: inset 0 0 0 1px rgb(104 74 104);
    padding: 4px 8px;
    color: white;
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
  border: 2px solid white;
  border-radius: 3px;
  img {
    width: 100%;
  }
`;