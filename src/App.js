import Title from "./comps/Title.js";
import UploadForm from "./comps/UploadForm";
import ImageGrid from "./comps/ImageGrid";
import styled from "styled-components";
import Modal from "./comps/Modal";
import { useState } from "react";

function App() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <Main className="App">
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
  padding: 0 5%;
`;

export default App;
