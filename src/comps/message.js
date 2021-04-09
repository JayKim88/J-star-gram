import React from "react";
import { formatRelative } from "date-fns";
import styled from "styled-components";

const Message = ({ user, text, createdAt }) => {
  const { uid, displayName, photoURL } = user;
  return (
    <Main>
      {photoURL ? (
        <Img src={photoURL} alt="Avatar" width={45} height={45}></Img>
      ) : null}
      <FirstWrap>
        <SecondWrap>
          {displayName ? <DisplayName>{displayName}</DisplayName> : null}
          {createdAt?.seconds ? (
            <DateToday>
              {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
            </DateToday>
          ) : null}
        </SecondWrap>
        <Text>{text}</Text>
      </FirstWrap>
    </Main>
  );
};

const Main = styled.div`
  /* border: 3px solid red; */
  display: flex;
  align-items: center;
  padding: 0.2rem 0.5rem 0.2rem 0.5rem;
  margin-bottom: 0.5rem;
  word-break: break-all;
`;
const Img = styled.img`
  /* border: 3px solid blue; */
  border-radius: 1.5rem;
`;
const FirstWrap = styled.div`
  /* border: 3px solid black; */
  border-radius: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  margin: 0.5rem;
  background-color: #ffb442;
`;
const SecondWrap = styled.div`
  /* border: 3px solid purple; */
  height: 0.5rem;
  margin-bottom: 0.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.7rem;
`;
const DisplayName = styled.p`
  /* border: 3px solid yellow; */
  margin-left: 0.2rem;
  color: black;
`;
const DateToday = styled.span`
  /* border: 3px solid green; */
  margin-left: 0.5rem;
  font-size: 0.6rem;
  color: gray;
`;
const Text = styled.p`
  /* border: 3px solid black; */
  text-align: left;
  margin: 0;
  margin-left: 0.2rem;
  font-size: 0.8rem;
`;

export default Message;
