import React, { useEffect, useState } from "react";
import { GuestOptions } from "./GuestOptions";
import "./HomePage.css";
import { HostOptions } from "./HostOptions";

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  //   gap: "1rem",
};

const userOptionsStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  padding: "1rem",
};

export const HomePage = () => {
  const [peerConnection, setPeerConnection] = useState(new RTCPeerConnection());
  const [currentUser, setCurrentUser] = useState("host");

  const init = async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      const remoteStream = new MediaStream();
      document.getElementById("host-video").srcObject = localStream;
      document.getElementById("guest-video").srcObject = remoteStream;

      console.log("media connected");
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });
      peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          remoteStream.addTrack(track);
        });
      };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleCheckBoxChange = (e) => {
    setCurrentUser(e.target.value);
  };

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>WebRTC</h2>
        <h3>Signaling SDPs manually</h3>
      </div>

      <div className="videosStyle">
        <video
          id="host-video"
          autoPlay
          playsInline
          className="video-player videoStyle"
        ></video>
        <video
          id="guest-video"
          autoPlay
          playsInline
          className="video-player videoStyle"
        ></video>
      </div>

      <div style={containerStyle}>
        <div style={{ padding: "1rem" }}>
          <input
            type="radio"
            id="host-selection"
            name="host-selection"
            value="host"
            checked={currentUser === "host"}
            onChange={(e) => {
              handleCheckBoxChange(e);
            }}
          />
          <label htmlFor="host" style={{ fontSize: "1.2rem" }}>
            host
          </label>
        </div>
        <div style={{ padding: "1rem" }}>
          <input
            type="radio"
            id="guest-selection"
            name="guest-selection"
            value="guest"
            checked={currentUser === "guest"}
            onChange={(e) => {
              handleCheckBoxChange(e);
            }}
          />
          <label htmlFor="guest" style={{ fontSize: "1.2rem" }}>
            guest
          </label>
        </div>
      </div>
      <div style={userOptionsStyle}>
        {currentUser === "host" ? (
          <HostOptions peerConnection={peerConnection} />
        ) : (
          <GuestOptions peerConnection={peerConnection} />
        )}
      </div>
    </>
  );
};
