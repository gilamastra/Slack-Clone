import React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";
const Login = ({ setUser }) => {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const newUser = {
          name: result.user.displayName,
          photo: result.user.photoURL,
        };
        setUser(newUser);

        localStorage.setItem("user", JSON.stringify(newUser));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Container>
      <Content>
        <img
          alt="slackLogo"
          src={
            "https://logodownload.org/wp-content/uploads/2019/08/slack-logo.png"
          }
        />
        <SignInButton
          onClick={() => {
            signIn();
          }}
        >
          Sign In With Google
        </SignInButton>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  padding: 100px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgb(0 0 0/ 12%), 0 1px 2px rgb(0 0 0 / 24%);
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    height: 100px;
  }
`;

const SignInButton = styled.button`
  margin-top: 50px;
  background-color: #0a8d48;
  color: white;
  border: 0;
  outline: 0;
  padding: 10px 5px;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
  :hover {
    filter: brightness(0.9);
    transition: 0.4s filter;
  }
`;
export default Login;
