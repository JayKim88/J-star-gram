import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Chatroom from "./Chatroom";

const Modal = ({ selectedImg, setSelectedImg, user }) => {
  const handleClick = (e) => {
    // console.log(e.target.classList);
    if (e.target.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };

  return (
    <Backdrop
      className="backdrop"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // transition={{ duration: 1 }}
    >
      <MainImg
        src={selectedImg.url}
        alt="enlarged img"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      />
      {user ? <Chatroom user={user} imgId={selectedImg.id} imgUser={selectedImg.user} imgCreatedAt={selectedImg.createdAt}/> : null}
    </Backdrop>
  );
};

const Backdrop = styled(motion.div)`
  /* border: 3px solid yellow; */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
const MainImg = styled(motion.img)`
  display: block;
  width: 45rem;
  height: 32rem;
  /* max-width: 60%;
  max-height: 100%; */
  margin: 10rem 0 10rem 0;
  box-shadow: 3px 5px 7px rgba(0, 0, 0, 0.5);
  border: 3px solid white;
  @media only screen and (max-width: 1100px) {
    margin: 0;
    width: 25rem;
    height: 20rem;
    /* transition: grid-template-columns 0.2s ease-in; */
  }
  @media only screen and (max-width: 500px) {
    width: 18rem;
    height: 17rem;
  }
`;

export default Modal;
