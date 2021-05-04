import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import styled from "styled-components";
import { motion } from "framer-motion";

const ProgressBar = ({ user, file, setFile }) => {
  const { url, progress } = useStorage(file, user);
  //useStorage(file) returns { progress, url, error };
  // console.log(progress, url);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <Progress
      percentage={progress}
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    >
      a
    </Progress>
  );
};

const Progress = styled(motion.div)`
  width: ${(props) => props.percentage + "%"};
  background: #ff8000;
  color: transparent;
`;

export default ProgressBar;
