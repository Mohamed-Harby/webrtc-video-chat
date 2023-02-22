import React, { useState } from "react";
import "./options.css";
const WrapperStyle = {
  width: "50%",
  height: "170px",
  minHeight: "170px",
  maxHeight: "170px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#E9E8E8",
  color: "#fff",
  fontSize: "2rem",
  gap: "1rem",
  border: "2px solid #20262E",
  borderRadius: "1rem",
};

export const GuestOptions = ({ peerConnection }) => {
  const [offer, setOffer] = useState("");
  const [answer, setAnswer] = useState("");

  const createAnswer = async () => {
    console.log(JSON.parse(offer));
    await peerConnection.setRemoteDescription(JSON.parse(offer));
    console.log("offer parsed");
    let generatedAnswer = await peerConnection.createAnswer();
    console.log("generatedAnswer", generatedAnswer);
    // console.log(JSON.parse(answer));
    await peerConnection.setLocalDescription(generatedAnswer);
    console.log(generatedAnswer);
    setAnswer(JSON.stringify(generatedAnswer));
  };

  return (
    <>
      <div style={WrapperStyle}>
        <p style={{ fontSize: "16px", color: "#20262E" }}>
          Add host offer here to connect
        </p>
        <input
          className="userTextField"
          value={offer}
          placeholder="offer..."
          onChange={(e) => setOffer(e.target.value)}
        />
        <button onClick={createAnswer}>Create Answer</button>
      </div>
      <div style={WrapperStyle}>
        <p style={{ fontSize: "16px", color: "#20262E" }}>
          Send this answer to the user to connect
        </p>
        <input
          className="userTextField"
          readOnly
          value={answer}
          placeholder="answer..."
        />
      </div>
    </>
  );
};
