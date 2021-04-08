import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Modal = ({ selectedImg, setSelectedImg }) => {
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
        src={selectedImg}
        alt="enlarged img"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      ></MainImg>
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
`;
const MainImg = styled(motion.img)`
  display: block;
  width: 40%;
  /* max-width: 60%;
  max-height: 100%; */
  margin: 10rem auto;
  box-shadow: 3px 5px 7px rgba(0, 0, 0, 0.5);
  border: 3px solid white;
`;

export default Modal;
