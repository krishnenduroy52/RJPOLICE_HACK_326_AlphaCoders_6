import React, { useState, useRef } from "react";
import style from "../CardEvidence/CardEvidence.module.css";
import EvidenceToMap from "../MapCard/EvidenceToMap";
function CameraModal({ show, onHide, coordinates, userId }) {
    
  const videoRef = useRef(null);
  return (
    <>
      <div
        style={{ display: show ? "block" : "none" }}
        className={style.backdropStyle}
      ></div>
      <video
            ref={videoRef}
            autoPlay
            style={{ width: "100%", maxWidth: "400px", borderRadius: "5px" }}
        />
    </>
  );
}

export default CameraModal;
