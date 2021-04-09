import React from "react";
import styled from "styled-components";

const Title = () => {
  return (
    <Main className="title">
      <Header>
        <Logo>JStargram</Logo>
      </Header>
      <h2>Share your pictures</h2>
      <p>Share, Talk and Enjoy together 😃</p>
    </Main>
  );
};

const Main = styled.div`
  /* border: 3px solid red; */
  display: flex;
  flex-direction: column;
  h2 {
    font-style: italic;
    font-size: 2rem;
  }
`;
const Header = styled.div`
  /* border: 3px solid red; */
  display: flex;
  @media only screen and (max-width: 500px) {
    height: 4rem;
  }
`;
const Logo = styled.h1`
  /* border: 3px solid blue; */
  /* position: absolute; */
  left: 3rem;
  text-align: left;
  font-size: 1.5rem;
  color: #ff8000;
  @media only screen and (max-width: 500px) {
    position: absolute;
    left: 1rem;
  }
`;

export default Title;
