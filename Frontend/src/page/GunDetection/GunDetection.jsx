import React, { useEffect, useRef, useState } from "react";
import "./gunDetection.module.css";

const GunDetection = () => {
  const videoRef = useRef(null);
  const [cameraEvidence, setCameraEvidence] = useState([]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startCamera();

    return () => {
      // Clean up: stop the video stream when the component is unmounted
      const stream = videoRef.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        // Set srcObject to null to prevent potential issues
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      }
    };
  }, []);

  const sendFrameToServer = async () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const imageBlob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/jpeg")
      );

      const formData = new FormData();
      formData.append("image", imageBlob, "frame.jpg");

      // Send the image to the Flask backend
      await fetch("http://127.0.0.1:5000/gun-detection", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.download_link) {
            setCameraEvidence((prev) => [...prev, data.download_link]);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      sendFrameToServer();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#F8F6F5",
        padding: "4rem 1rem",
        borderRadius: "30px 30px 30px 30px",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        style={{ width: "100%", maxWidth: "600px", borderRadius: "15px" }}
      />
      <div>
        {cameraEvidence.map((link, idx) => (
          <div key={idx}>
            <img src={link} alt="camera evidence" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GunDetection;
