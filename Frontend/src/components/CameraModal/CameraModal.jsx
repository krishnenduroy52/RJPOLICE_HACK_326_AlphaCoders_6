import React, { useState, useRef, useEffect } from "react";
import style from "./CameraModal.module.css";

import axios from "axios";
function CameraModal({ camLink, closeModal }) {
    
  const [frame, setFrame] = useState("");
  
  const [error, setError] = useState(null);
  console.log(camLink);
  if(!camLink) return;
    console.log(camLink)
//   useEffect(() => {
//     const startVideo = async() => {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//         });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         console.error("Error accessing webcam:", error);
//       }
//     }
//     startVideo()
//     return () => {
//         const stream = videoRef.current?.srcObject;
//         if (stream) {
//           const tracks = stream.getTracks();
//           tracks.forEach((track) => track.stop());
//           if (videoRef.current) {
//             videoRef.current.srcObject = null;
//           }
//         }
//       };
//   },[])
  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get(
            camLink
          );
          setFrame(response.data);
          setError(null);
        } catch (error) {
          setError("Error fetching frame");
        }
      };
    const interval = setInterval(() => {
      fetchData();
    }, 123);
    return () => clearInterval(interval);
  }, [camLink]);

  return (
    <>
      <div
        className={style.backdropStyle}
      ></div>
      <div
        className={style.modalStyle}
      >
            {frame && (
        <img alt="Webcam Frame" src={`data:image/jpeg;base64,${frame}`} />
      )}
      <button onClick={()=>closeModal()} className={style.closeButton}>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default CameraModal;
