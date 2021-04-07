import React from "react";
import useFiretore from "../hooks/useFirestore";
import styled from "styled-components";

const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFiretore("images");
  // console.log(docs);
  return (
    <ImageBox>
      {docs &&
        docs.map((doc) => (
          <ImageWrap
            className="img-wrap"
            key={doc.id}
            onClick={() => setSelectedImg(doc.url)}
          >
            <Image src={doc.url} alt="uploaded pic"></Image>
          </ImageWrap>
        ))}
    </ImageBox>
  );
};

const ImageBox = styled.div`
  /* border: 3px solid red; */
  margin: 20px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
`;
const ImageWrap = styled.div`
  /* border: 3px solid blue; */
  overflow: hidden;
  height: 0;
  padding: 50% 0;
  position: relative;
  opacity: 0.8;
`;
const Image = styled.img`
  min-width: 100%;
  min-height: 100%;
  max-width: 150%;
  position: absolute;
  top: 0;
  left: 0;
`;

export default ImageGrid;
