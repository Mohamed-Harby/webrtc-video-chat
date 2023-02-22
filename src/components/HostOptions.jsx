import React, { useEffect, useState } from "react";
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

export const HostOptions = ({ peerConnection }) => {
  const [offer, setOffer] = useState("");
  const [guestAnswer, setGuestAnswer] = useState("");

  const createOffer = async () => {
    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        setOffer(JSON.stringify(peerConnection.localDescription));
      }
    };
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    setOffer(JSON.stringify(offer));
    console.log(offer);
  };

  const addAnswer = async () => {
    console.log("Add answer triggerd");
    // let answer = JSON.parse(document.getElementById("answer-sdp").value);
    console.log("answer:", guestAnswer);
    if (!peerConnection.currentRemoteDescription) {
      peerConnection.setRemoteDescription(JSON.parse(guestAnswer));
    }
  };

  return (
    <>
      <div style={WrapperStyle}>
        <p style={{ fontSize: "16px", color: "#20262E" }}>
          Create an offer and send it to the guest
        </p>
        <button onClick={createOffer}>Create offer</button>
        <input
          className="userTextField"
          readOnly
          value={offer}
          placeholder="offer code..."
        />
      </div>

      <div style={WrapperStyle}>
        <p style={{ fontSize: "16px", color: "#20262E" }}>
          Add guest answer here to connect
        </p>
        <input
          className="userTextField"
          value={guestAnswer}
          onChange={(e) => setGuestAnswer(e.target.value)}
        />
        <button onClick={addAnswer}>Add Answer</button>
      </div>
    </>
  );
};
