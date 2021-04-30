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
        <SlackImg src="http://assets.stickpng.com/images/5cb480b85f1b6d3fbadece78.png" />
        <h1>Sign in </h1>
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
  width: 100%;
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
`;

const SlackImg = styled.img`
  height: 150px;
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
`;
export default Login;
