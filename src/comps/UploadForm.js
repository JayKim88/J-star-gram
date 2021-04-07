import React, { useState } from "react";
// import useStorage from "../hooks/useStorage.js";
import ProgressBar from "./ProgressBar";
import styled from "styled-components";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const type = ["image/jpeg", "image/png"];

  const handleImage = (e) => {
    const image = e.target.files[0];
    // console.log(image);
    if (image && type.includes(image.type)) {
      setFile(image);
      setError(null);
      // console.log(image);
    } else {
      setFile(null);
      setError("Please select an image file(jpeg or png)");
    }
  };

  return (
    <form>
      <InputImg type="file" onChange={handleImage} />
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

const InputImg = styled.input`
  /* display: none; */
  width: 120px;
  /* border: 3px solid red; */
  /* color: transparent; */
`;

export default UploadForm;
