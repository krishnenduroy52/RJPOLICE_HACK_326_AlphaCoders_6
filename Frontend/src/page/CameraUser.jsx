// import React, { useEffect, useRef } from "react";
// import Webcam from "react-webcam";
// import io from "socket.io-client";

// const CameraUser = () => {
//   const webcamRef = useRef(null);
//   const socketRef = useRef();

//   useEffect(() => {
//     // Connect to the WebSocket server
//     socketRef.current = io.connect("http://localhost:8000/");

//     // Set up WebRTC
//     const configuration = {
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     };
//     const peerConnection = new RTCPeerConnection(configuration);

//     // Add webcam stream to the peer connection
//     const webcamStream = webcamRef.current.video?.srcObject;
//     if (webcamStream) {
//       webcamStream
//         .getTracks()
//         .forEach((track) => peerConnection.addTrack(track, webcamStream));
//     }

//     // Event handler for receiving ICE candidates from admin
//     socketRef.current.on("ice-candidate", (candidate) => {
//       peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//     });

//     // Event handler for receiving SDP offer from admin
//     socketRef.current.on("sdp-offer", async (offer) => {
//       console.log("Received SDP offer from admin:", offer);
//       await peerConnection.setRemoteDescription(
//         new RTCSessionDescription(offer)
//       );
//       const answer = await peerConnection.createAnswer();
//       await peerConnection.setLocalDescription(answer);

//       // Send the answer to the admin
//       socketRef.current.emit("sdp-answer", answer);
//     });

//     // Event handler for receiving SDP answer from admin
//     socketRef.current.on("sdp-answer", (answer) => {
//       console.log("Received SDP answer from admin:", answer);
//       peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
//     });

//     // Event handler for sending ICE candidates to admin
//     peerConnection.onicecandidate = (event) => {
//       if (event.candidate) {
//         socketRef.current.emit("ice-candidate", event.candidate);
//       }
//     };

//     // Cleanup on component unmount
//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, []);

//   const capture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();

//     const formData = new FormData();
//     formData.append("image", dataURItoBlob(imageSrc));

//     fetch("http://127.0.0.1:5000/upload", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Success:", data);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   // Helper function to convert data URI to Blob
//   function dataURItoBlob(dataURI) {
//     const byteString = atob(dataURI.split(",")[1]);
//     const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);

//     for (let i = 0; i < byteString.length; i++) {
//       ia[i] = byteString.charCodeAt(i);
//     }

//     return new Blob([ab], { type: mimeString });
//   }

//   useEffect(() => {
//     const intervalId = setInterval(capture, 5000);

//     // Cleanup the interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <>
//       <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
//     </>
//   );
// };

// export default CameraUser;

// CameraUser.jsx
import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

const CameraUser = () => {
  const webcamRef = useRef();

  useEffect(() => {
    const captureAndSend = () => {
      const userStream = webcamRef.current.getScreenshot();
      socket.emit("sendWebcamStream", userStream);
    };

    const intervalId = setInterval(captureAndSend, 10); // Send stream every second

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Helper function to convert data URI to Blob
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  useEffect(() => {
    const captureAndSendToFlask = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log("send to flask");
      const formData = new FormData();
      formData.append("image", dataURItoBlob(imageSrc));

      fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    const intervalId = setInterval(captureAndSendToFlask, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <Webcam ref={webcamRef} />
    </div>
  );
};

export default CameraUser;
