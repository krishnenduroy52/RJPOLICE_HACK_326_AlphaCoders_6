import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import style from './criminalDetection.module.css'
import CardEvidence from "../../components/card/CardEvidence/CardEvidence";

import { DetailsContext } from "../../context/DetailsContext";

const CriminalDetection = () => {
    const videoRef = useRef(null);
    const imageInputRef = useRef(null);
    const [refImage, setRefImage] = useState(null);
    const [capturing, setCapturing] = useState(false);
    const { evidence } = useContext(DetailsContext);
  
    const [cameraEvidence, setCameraEvidence] = useState([]);
    const sendFrameToServer = useCallback(async () => {
      if (videoRef.current && refImage) {
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
        formData.append("refImage", refImage, refImage.name);
        console.log(formData);
  
        // Send the image to the Flask backend
        await fetch("http://127.0.0.1:5000/gun-detection", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then(async (data) => {
            console.log(data);
            if (data?.download_link) {
              const uploadCrime = await fetch(
                "http://localhost:8000/crime/evidence",
                {
                  method: "POST",
                  body: JSON.stringify({
                    image: data.download_link,
                    location: {
                      latitude: 10.762622,
                      longitude: 106.660172,
                    },
                    time: "2021-09-30 12:00:00",
                    userid: "1",
                    crime: "Gun detected",
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
                      latitude: 10.762622,
                      longitude: 106.660172,
                    },
                    time: "2021-09-30 12:00:00",
                    userid: "1",
                    crime: "Match Found",
                  },
                  ...prev,
                ]);
              }
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        console.log(videoRef.current, refImage);
      }
    }, [refImage]);
  
    useEffect(() => {
      setCameraEvidence(evidence.filter((evi) => evi.crime === "Criminal Detected"));
    }, [evidence]);

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
          const stream = videoRef.current?.srcObject;
          if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
            if (videoRef.current) {
              videoRef.current.srcObject = null;
            }
          }
        };
      }, []);

      useEffect(() => {
        if (capturing) {
          const intervalId = setInterval(() => {
            sendFrameToServer();
          }, 1000);
    
          return () => clearInterval(intervalId);
        }
      }, [capturing, sendFrameToServer]);

      const handleInput = () => {
        if(!refImage && !imageInputRef.current.files[0]){
           imageInputRef.current.click();
           return;
        }
        const file = imageInputRef.current.files[0];
        setRefImage(file);
      };

      
    
      useEffect(() => {
        const interval = setInterval(() => {
          sendFrameToServer();
        }, 5000);
        return () => clearInterval(interval);
      }, [sendFrameToServer]);

    return (
        
    <div
    style={{
      backgroundColor: "#F8F6F5",
      padding: "4rem 1rem",
      borderRadius: "30px 30px 30px 30px",
    }}
  >
    <div className={style.one}>
      <h1 className={style.headline}>Live Criminal Detection</h1>
    </div>
    <div className={style.wrapper}>
      <div className={style.video}>
        <h1>CCTV Footage</h1>
        <video
          ref={videoRef}
          autoPlay
          style={{ width: "100%", maxWidth: "400px", borderRadius: "5px" }}
        />
        <div className={style.file_upload_container}>
      <input className={style.videoInput} type="file" accept="image/*" ref={imageInputRef} onChange={handleInput}/>
      <button className={style.upload_button} onClick={handleInput}>
        <span className={style.upload_icon}></span> {refImage == null ? "Submit Image": "Upload"}
      </button>
      </div>
      </div>
      <div className={style.evidence}>
        {cameraEvidence &&
          cameraEvidence.map((evi, idx) => (
            <CardEvidence key={idx} evi={evi} />
          ))}
      </div>
      {/* {refImage && <img src={URL.createObjectURL(refImage)} alt="ref" style={{width: "100px", height: "100px"}} />} */}
    </div>
  </div>
    )
}

export default CriminalDetection;
