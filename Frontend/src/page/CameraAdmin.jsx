// import React, { useEffect, useRef } from "react";
// import io from "socket.io-client";

// const CameraAdmin = () => {
//   const videoRef = useRef();
//   const socketRef = useRef();

//   useEffect(() => {
//     socketRef.current = io.connect("http://localhost:8000/");

//     // Set up WebRTC for admin
//     const configuration = {
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     };
//     const peerConnection = new RTCPeerConnection(configuration);

//     // Event handler for receiving ICE candidates from user
//     socketRef.current.on("ice-candidate", (candidate) => {
//       peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//     });

//     // Event handler for receiving SDP offer from user
//     socketRef.current.on("sdp-offer", async (offer) => {
//       console.log("Received SDP offer from user:", offer);
//       await peerConnection.setRemoteDescription(
//         new RTCSessionDescription(offer)
//       );
//       const answer = await peerConnection.createAnswer();
//       await peerConnection.setLocalDescription(answer);

//       // Send the answer to the user
//       socketRef.current.emit("sdp-answer", answer);
//     });

//     // Event handler for receiving SDP answer from user
//     socketRef.current.on("sdp-answer", (answer) => {
//       console.log("Received SDP answer from user:", answer);
//       peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
//     });

//     // Event handler for sending ICE candidates to user
//     peerConnection.onicecandidate = (event) => {
//       if (event.candidate) {
//         socketRef.current.emit("ice-candidate", event.candidate);
//       }
//     };

//     // Add the user video stream to the peer connection
//     const userVideoStream = videoRef.current.srcObject;
//     if (userVideoStream) {
//       userVideoStream
//         .getTracks()
//         .forEach((track) => peerConnection.addTrack(track, userVideoStream));
//     }

//     // Cleanup on component unmount
//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Admin Page</h1>
//       <video ref={videoRef} autoPlay />
//     </div>
//   );
// };

// export default CameraAdmin;

// CameraAdmin.jsx
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

const CameraAdmin = () => {
  const [webcamStream, setWebcamStream] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      socket.on("receiveWebcamStream", (userStream) => {
        if (userStream) {
          setWebcamStream(userStream);
        }
      });

      return () => {
        socket.disconnect();
      };
    });
  }, []);

  return (
    <div>
      <h2>Admin Page</h2>
      {webcamStream && <img src={webcamStream} alt="Webcam stream" />}
    </div>
  );
};

export default CameraAdmin;
