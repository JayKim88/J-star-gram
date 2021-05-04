import React, { useState, useEffect } from "react";
import { timeStamp } from "../firebase/config";
import styled from "styled-components";
import { motion } from "framer-motion";
import Message from "./message";
import firebase from "firebase/app";

const Chatroom = ({ user = null, imgId= null, imgUser = null, imgCreatedAt = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [createdDate, setCreatedDate] = useState("")
  const { uid, displayName, photoURL } = user;
  const db = firebase.firestore();
  
  useEffect(() => {
    const createdDate = () => {
      let myDate = new window.Date((imgCreatedAt.seconds + 3600*9)*1000)
      const year = myDate.getFullYear();
      const month = myDate.getMonth() + 1;
      const day = myDate.getDate();
      const week = ["일", "월", "화", "수", "목", "금", "토"];
      const dayOfWeek = week[new window.Date(`${year}-${month}-${day}`).getDay()];
      return `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`;
    };
    setCreatedDate(createdDate());

    if (db) {
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
              return ele.imgId === imgId; //extract messages for the selectedImg
            });
            // console.log(data)
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
  }, [db, imgId, imgCreatedAt.seconds]);

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
        imgId: imgId,
      });
    }
    setNewMessage("");
    // const inputBox = document.getElementById("inputBox");
    // inputBox.focus();
  };

  return (
    <Main initial={{ y: "-100vh" }} animate={{ y: 0 }}>
      <Header>
        <div>Shared by {imgUser}📸</div>
        <div>{createdDate}</div>
      </Header>
      <Ulbox id="ulbox" style={{ listStyle: "none", paddingLeft: "0px" }}>
        {messages.map((message) => (
          <li id="libox" key={message.id}>
            <Message
              user={message}
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
          ⇧
        </Button>
      </SubmitBox>
    </Main>
  );
};

const Main = styled(motion.div)`
  /* border: 3px solid red; */
  width: 20rem;
  height: 32.4rem;
  margin: 10rem 0 10rem 0rem;
  background: white;
  box-shadow: 3px 5px 7px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content:center;
  @media only screen and (max-width: 1100px) {
    width: 25.35rem;
    height: 20.4rem;
    margin: 0;
  }
  @media only screen and (max-width: 500px) {
    width: 18.4rem;
    height: 18rem;
  }
`;
const Header = styled.div`
  /* border: 3px solid blue; */
  width: 95%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.2); */
  font-size: 0.8rem;
  padding: 0 0.5rem;
  /* font-weight: bold; */
  /* div {
    border: 1px solid red;
  } */
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
