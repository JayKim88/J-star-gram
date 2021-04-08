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
      setError("Please select an image file( jpeg or png )");
      setTimeout(() => {
        const errMsg = document.getElementById("error");
        errMsg.style.visibility = "hidden";
        errMsg.style.opacity = 0;
      }, 2000);
    }
  };

  return (
    <form>
      <Label htmlFor="file-upload">+</Label>
      <InputImg id="file-upload" type="file" onChange={handleImage} />
      <Output className="output">
        {error && <div id="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </Output>
    </form>
  );
};

const Label = styled.label`
  border: 1px solid transparent;
  border-radius: 20px;
  display: inline-block;
  margin-top: 2rem;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 20px;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.5);
  :hover {
    background: black;
    color: white;
  }
`;
const InputImg = styled.input`
  display: none;
  /* width: 120px; */
  border: 3px solid black;
  border-radius: 20px;
`;
const Output = styled.div`
  /* border: 3px solid black; */
  margin-top: 2rem;
  height: 1.5rem;
  #error {
    /* border: 3px solid red; */
    display: block;
    visibility: 1;
    transition: all 2s;
  }
`;

export default UploadForm;
