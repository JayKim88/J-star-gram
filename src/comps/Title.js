import React from "react";
import styled from "styled-components";

const Title = () => {
  return (
    <Main className="title">
      <h1>JStargram</h1>
      <h2>Share your pictures</h2>
      <p>Share, Talk and Enjoy together 😃</p>
    </Main>
  );
};

const Main = styled.div`
  /* border: 3px solid red; */
  display: flex;
  flex-direction: column;
  h1 {
    text-align: left;
    font-size: 1.2rem;
    color: #ff8000;
  }
  h2 {
    font-style: italic;
    font-size: 2rem;
  }
`;

export default Title;
