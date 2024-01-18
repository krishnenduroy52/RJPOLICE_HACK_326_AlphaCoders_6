import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./accidentdetection.module.css";
import CardEvidence from "../../components/card/CardEvidence/CardEvidence";
import { DetailsContext } from "../../context/DetailsContext";

const AccidentDetection = () => {
  const videoRef = useRef(null);

  const isVideo = useRef(false);
  const { evidence, user } = useContext(DetailsContext);
  // evidence = [{...}, {...}, {...}]

  const [cameraEvidence, setCameraEvidence] = useState([]);

  useEffect(() => {
    setCameraEvidence(
      evidence.filter((evi) => evi.crime === "Accident detected")
    );
  }, [evidence]);

  // useEffect(() => {
  //   const startCamera = async () => {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         video: true,
  //       });
  //       if (videoRef.current) {
  //         videoRef.current.srcObject = stream;
  //       }
  //     } catch (error) {
  //       console.error("Error accessing webcam:", error);
  //     }
  //   };

  //   startCamera();

  //   return () => {
  //     const stream = videoRef.current?.srcObject;
  //     if (stream) {
  //       const tracks = stream.getTracks();
  //       tracks.forEach((track) => track.stop());
  //       if (videoRef.current) {
  //         videoRef.current.srcObject = null;
  //       }
  //     }
  //   };
  // }, []);

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
      await fetch("http://127.0.0.1:5000/accident-detection", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data?.download_link) {
            const uploadCrime = await fetch(
              "http://localhost:8000/crime/evidence",
              {
                method: "POST",
                body: JSON.stringify({
                  image: data.download_link,
                  location: {
                    latitude: user.camera.cameraLatitude,
                    longitude: user.camera.cameraLongitude,
                  },
                  time: new Date().toISOString().slice(0, 19).replace("T", " "),
                  userid: user._id,
                  crime: "Accident detected",
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (uploadCrime.status === 200) {
              setCameraEvidence((prev) => [
                {
                  image: data.download_link,
                  location: {
                    latitude: user.camera.cameraLatitude,
                    longitude: user.camera.cameraLongitude,
                  },
                  time: new Date().toISOString().slice(0, 19).replace("T", " "),
                  userid: user._id,
                  crime: "Fire detected",
                },
                ...prev,
              ]);
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const handleVideo = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "video/mp4") {
      alert("Please upload a video file.");
      return;
    }
    isVideo.current = true;
    const videoURL = URL.createObjectURL(file);

    videoRef.current.src = videoURL;
    videoRef.current.load();
    videoRef.current.muted = true;
  };
  const startWebCam = async () => {
    // check if camera is already in use if in use stop the webcam and restart it
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      //stop all tracks
      tracks.forEach(function (track) {
        track.stop();
      });
      //set the srcObject to null
      videoRef.current.srcObject = null;
    }

    // starts the webcam and sends the image to the backend
    try {
      isVideo.current = false;
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

  useEffect(() => {
    const interval = setInterval(() => {
      sendFrameToServer();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#DCF2F1",
        padding: "4rem 1rem",
        borderRadius: "30px 30px 30px 30px",
      }}
    >
      <div className={style.one}>
        <h1 className={style.headline}>Live Accident Detection</h1>
      </div>
      <div className={style.wrapper}>
        <div className={style.video}>
          <h1>CCTV Footage</h1>
          <video
            ref={videoRef}
            autoPlay
            style={{ width: "100%", maxWidth: "400px", borderRadius: "5px" }}
          />
          <button onClick={startWebCam}>Start Webcam</button>
          <span className="font-bold">or</span>
          <input type="file" accept="video/*" onChange={handleVideo} />
        </div>
        <div className={style.evidence}>
          {cameraEvidence &&
            cameraEvidence.map((evi, idx) => (
              <CardEvidence key={evi.id} evi={evi} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AccidentDetection;
