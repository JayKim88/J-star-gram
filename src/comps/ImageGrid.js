import React from "react";
import useFiretore from "../hooks/useFirestore";
import styled from "styled-components";
import { motion } from "framer-motion";

const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFiretore("images");
  // console.log(docs);
  return (
    <ImageBox>
      {docs &&
        docs.map((doc) => (
          <ImageWrap
            layout
            className="img-wrap"
            key={doc.id}
            onClick={() => setSelectedImg(doc)}
          >
            <Image
              src={doc.url}
              alt="uploaded pic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
          </ImageWrap>
        ))}
    </ImageBox>
  );
};

const ImageBox = styled.div`
  /* border: 3px solid red; */
  margin: 50px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
  @media only screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
    /* transition: grid-template-columns 0.2s ease-in; */
  }
  @media only screen and (max-width: 500px) {
    grid-template-columns: 1fr;
    /* transition: grid-template-columns 0.2s ease-in; */
  }
`;
const ImageWrap = styled(motion.div)`
  /* border: 3px solid blue; */
  overflow: hidden;
  height: 0;
  padding: 50% 0;
  position: relative;
  opacity: 0.8;
  cursor: pointer;
  :hover {
    /* box-shadow: 2px 3px 1px 2px rgba(0, 0, 0, 0.8); */
    opacity: 1;
    transition: opacity 0.2s ease-in;
  }
`;
const Image = styled(motion.img)`
  min-width: 100%;
  min-height: 100%;
  max-width: 150%;
  position: absolute;
  top: 0;
  left: 0;
`;

export default ImageGrid;
