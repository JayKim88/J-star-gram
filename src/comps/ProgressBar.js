import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import styled from "styled-components";

const ProgressBar = ({ file, setFile }) => {
  const { url, progress } = useStorage(file);
  //useStorage(file) returns { progress, url, error };
  console.log(progress, url);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return <Progress percentage={progress}>{Math.ceil(progress)} %</Progress>;
};

const Progress = styled.div`
  width: ${(props) => props.percentage + "%"};
  background: red;
`;

export default ProgressBar;
