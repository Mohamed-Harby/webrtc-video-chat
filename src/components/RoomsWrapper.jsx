import React from "react";
import { Room } from "./Room";

const roomsWrapperStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  backgroundColor: "lightblue",
  gap: "1.5rem",
};

export const RoomsWrapper = () => {
  return (
    <div style={roomsWrapperStyle}>
      <Room size={100 / 3} />
      <Room size={100 / 3} />
      <Room size={100 / 3} />
      <Room size={100 / 3} />
      {/* <Room size={100 / 3} /> */}
    </div>
  );
};
