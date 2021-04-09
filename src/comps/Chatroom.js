import React, { useState, useEffect } from "react";
import { timeStamp } from "../firebase/config";
import styled from "styled-components";
import { motion } from "framer-motion";
import Message from "./message";
import firebase from "firebase/app";

const Chatroom = ({ user = null, selectedImgId = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { uid, displayName, photoURL } = user;
  const db = firebase.firestore();
  // console.log(selectedImgId);
  useEffect(() => {
    if (db) {
      // console.log("why not working"); //여기에선 콘솔로그가 안찍힌다!!!
      const unsub = db
        .collection("messages")
        // .where("imgId", "==", selectedImgId)
        .orderBy("createdAt")
        .limit(100)
        .onSnapshot((snap) => {
          //show recent message
          const ulObj = document.getElementById("ulbox");
          ulObj.scrollTop = ulObj.scrollHeight;
          const data = snap.docs
            .map((doc) => ({ ...doc.data(), id: doc.id })) //Each child in a list should have a unique "key" prop.
            .filter((ele) => {
              return ele.imgId === selectedImgId; //extract messages for the selectedImg
            });
          if (data.length <= 10) {
            setMessages(data);
          } else {
            const lastTen = data.slice(data.length - 10, data.length);
            // console.log(lastTen);
            setMessages(lastTen);
          }
        });

      return unsub;
    }
  }, [db, selectedImgId]);

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (db) {
      //make specific collection for each pircture!!
      db.collection("messages").add({
        text: newMessage,
        createdAt: timeStamp(),
        uid,
        displayName,
        photoURL,
        imgId: selectedImgId,
      });
    }
    setNewMessage("");
    // const inputBox = document.getElementById("inputBox");
    // inputBox.focus();
  };

  return (
    <Main initial={{ y: "-100vh" }} animate={{ y: 0 }}>
      <Header>Let's talk about picture 📸</Header>
      <Ulbox id="ulbox" style={{ listStyle: "none", paddingLeft: "0px" }}>
        {messages.map((message) => (
          <li id="libox" key={message.id}>
            <Message
              user={user}
              text={message.text}
              createdAt={message.createdAt}
            />
          </li>
        ))}
      </Ulbox>
      <SubmitBox onSubmit={handleOnSubmit}>
        <Input
          id="inputBox"
          type="text"
          value={newMessage}
          onChange={handleOnChange}
          placeholder="Type your message"
        />
        <Button type="submit" disabled={!newMessage} invisible={!newMessage}>
          ⬆
        </Button>
      </SubmitBox>
    </Main>
  );
};

const Main = styled(motion.div)`
  /* border: 3px solid red; */
  width: 20rem;
  margin: 10rem 0 10rem 0rem;
  background: white;
  box-shadow: 3px 5px 7px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 1000px) {
    width: 20rem;
    height: 20.4rem;
    /* transition: grid-template-columns 0.2s ease-in; */
  }
  @media only screen and (max-width: 700px) {
    margin: 0;
    width: 20.4rem;
  }
`;
const Header = styled.div`
  /* border: 3px solid blue; */
  height: 10%;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  box-shadow: 3px 5px 7px rgba(0, 0, 0, 0.2);
  font-size: 1.2rem;
  /* font-weight: bold; */
`;
const Ulbox = styled.ul`
  /* border: 3px solid red; */
  height: 79%;
  overflow-y: auto;
  margin: 0;
  padding-left: 1rem;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const SubmitBox = styled.form`
  /* position: fixed; */
  /* border: 3px solid red; */
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 1000px) {
    height: 15%;
    /* transition: grid-template-columns 0.2s ease-in; */
  }
`;
const Input = styled.input`
  border: 1px solid transparent;
  border-radius: 2rem;
  font-size: 1rem;
  white-space: normal;
  width: 80%;
  height: 2rem;
  margin-left: 0.7rem;
  margin-right: 0.7rem;
  padding-left: 1rem;
  padding-right: 2.5rem;
  outline: none;
  :focus {
    box-shadow: 3px 5px 7px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.5s ease-in;
  }
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.invisible === true ? 0 : 1)};
  position: absolute;
  right: 1.1rem;
  border: 1px solid transparent;
  border-radius: 3rem;
  width: 2rem;
  height: 2rem;
  word-break: break-all;
  font-size: 1.7rem;
  font-stretch: ultra-expanded;
  outline: none;
  background: orange;
  color: white;
  cursor: ${(props) => (props.invisible === true ? "auto" : "pointer")};
  transition: opacity 1s;
`;
export default Chatroom;
