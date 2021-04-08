import Title from "./comps/Title.js";
import UploadForm from "./comps/UploadForm";
import ImageGrid from "./comps/ImageGrid";
import styled from "styled-components";
import Modal from "./comps/Modal";
import { useState } from "react";

function App() {
  const [selectedImg, setSelectedImg] = useState(null);

  //Get the button

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = () => {
    scrollFunction();
  };

  function scrollFunction() {
    const topBtn = document.getElementById("topBtn");
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      topBtn.style.display = "block";
      topBtn.style.visibility = "visible";
      topBtn.style.opacity = 1;
      topBtn.style.transition = "all 2s";
    } else {
      topBtn.style.visibility = "hidden";
      topBtn.style.opacity = 0;
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <Main className="App">
      <ScrollTopBtn id="topBtn" onClick={topFunction}>
        Top
      </ScrollTopBtn>
      <Title />
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </Main>
  );
}

const Main = styled.div`
  /* border: 3px solid red; */
  /* display: flex;
  flex-direction: column; */
  text-align: center;
  padding: 1vw 15vw;
`;
const ScrollTopBtn = styled.button`
  border: 3px solid red;
  display: none;
  position: fixed;
  bottom: 15px;
  right: 20px;
  z-index: 99;
  font-size: 1rem;
  border: none;
  outline: none;
  background-color: #f37f2d;
  color: white;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  transition: display 2s;
`;

export default App;
