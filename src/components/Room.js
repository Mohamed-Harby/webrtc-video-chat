import React from "react";

const videoStyle = {
  width: `${100 / 3}vw`,
  height: `${100 / 3}vh`,
  backgroundColor: "black",
  border: "3px solid violet",
  borderRadius: "15px",
  paddingLeft: "20px",
  paddingRigth: "20px",
};

export const Room = () => {
  return <video autoPlay playsInline style={videoStyle}></video>;
};
