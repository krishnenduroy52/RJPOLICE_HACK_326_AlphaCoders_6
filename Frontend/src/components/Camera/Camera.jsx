import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import "./camera.css";

const socket = io("http://localhost:8000"); // Adjust the server URL accordingly

const Camera = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [user, setUser] = useState(true);

  const navigate = useNavigate();

  // useEffect(() => {
  // const user = localStorage.getItem("isAdmin");
  // setUser(true);

  // if (!user) {
  //   navigate("/");
  // } else {
  //   setUser((user) => {
  //     return user;
  //   });
  // }
  // }, []);

  useEffect(() => {
    const initializeMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setLocalStream(stream);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    initializeMediaStream();
  }, []);

  const startCall = () => {
    const newPeerConnection = new RTCPeerConnection();
    setPeerConnection(newPeerConnection);

    localStream
      .getTracks()
      .forEach((track) => newPeerConnection.addTrack(track, localStream));

    newPeerConnection.onicecandidate = handleIceCandidate;
    newPeerConnection.ontrack = handleTrack;

    newPeerConnection
      .createOffer()
      .then((offer) => newPeerConnection.setLocalDescription(offer))
      .then(() => {
        // Emit offer to the socket server
        socket.emit("offer", { offer: newPeerConnection.localDescription });
      });
  };

  const handleIceCandidate = (event) => {
    if (event.candidate) {
      socket.emit("ice-candidate", { candidate: event.candidate });
    }
  };

  const handleTrack = (event) => {
    // Create a new MediaStream and set it as the remote stream
    const newRemoteStream = new MediaStream();
    setRemoteStream(newRemoteStream);

    // Add the received tracks to the remote stream
    event.streams[0]
      .getTracks()
      .forEach((track) => newRemoteStream.addTrack(track));
  };

  const hangUp = () => {
    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
      setRemoteStream(null);
    }
  };

  useEffect(() => {
    // Event listeners for socket.io
    socket.on("offer", (data) => {
      peerConnection
        .setRemoteDescription(data.offer)
        .then(() => peerConnection.createAnswer())
        .then((answer) => peerConnection.setLocalDescription(answer))
        .then(() => {
          socket.emit("answer", { answer: peerConnection.localDescription });
        });
    });

    socket.on("answer", (data) => {
      peerConnection.setRemoteDescription(data.answer);
    });

    socket.on("ice-candidate", (data) => {
      peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    });

    return () => {
      // Clean up event listeners if needed
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, [peerConnection]);

  useEffect(() => {
    if (localStream) startCall();
  }, [localStream]);

  return (
    <div>
      <h1 className="text-3xl flex justify-center font-[Poppins] font-semibold">
        Click to view a camera footage
      </h1>
      {/* {user ? (
        <div className="all-cams">
          <button
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            id="startButton"
            onClick={startCall}
            disabled={!localStream}
          >
            View CCTV
          </button>
          <button
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            id=""
            onClick={startCall}
            disabled={!localStream}
          >
            View CCTV
          </button>
          <button
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            id=""
            onClick={startCall}
            disabled={!localStream}
          >
            View CCTV
          </button>
          <button
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            id=""
            onClick={startCall}
            disabled={!localStream}
          >
            View CCTV
          </button>
          <button
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            id=""
            onClick={startCall}
            disabled={!localStream}
          >
            View CCTV
          </button>
        </div>
      ) : null} */}

      {/* <video id="localVideo" style={{ height: '80%', width: '80%' }} autoPlay muted ref={(video) => { if (video) video.srcObject = localStream; }}></video> */}
      {user ? (
        <video
          className="flex justify-center"
          style={{ height: "200px" }}
          id="remoteVideo"
          autoPlay
          ref={(video) => {
            if (video) video.srcObject = remoteStream;
          }}
        ></video>
      ) : (
        <video
          className="flex justify-center"
          style={{ height: "200px" }}
          id="remoteVideo"
          autoPlay
          ref={(video) => {
            if (video) video.srcObject = localStream;
          }}
        ></video>
      )}

      {/* Hangup Button disabled */}
      {/* <button id="hangupButton" onClick={hangUp} disabled={!peerConnection}>Hang Up</button> */}
    </div>

    // <div>
    //     <video id="localVideo" autoPlay muted ref={(video) => { if (video) video.srcObject = localStream; }}></video>
    //     <video id="remoteVideo" autoPlay ref={(video) => { if (video) video.srcObject = remoteStream; }}></video>
    //     <button id="startButton" onClick={startCall} disabled={!localStream}>Start Call</button>
    //     <button id="hangupButton" onClick={hangUp} disabled={!peerConnection}>Hang Up</button>
    // </div>
  );
};

export default Camera;
