import React, { useState } from "react";
import style from "../CardEvidence/CardEvidence.module.css";
import EvidenceToMap from "../MapCard/EvidenceToMap";
function CenteredModal({ show, onHide, coordinates, userId }) {
  return (
    <>
      <div
        style={{ display: show ? "block" : "none" }}
        className={style.backdropStyle}
      ></div>
      <div
        style={{ display: show ? "block" : "none" }}
        className={style.modalStyle}
      >
        {/* Close button */}
        <button onClick={onHide} className={style.closeButton}>
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

        <div className={style.modalContainer}>
          <h1 className="text-xl font-bold">Crime Details</h1>
          <h2 className="text-l">Modal Subheading</h2>
        </div>
        {show ? (
          <EvidenceToMap coordinates={coordinates} userID={userId} />
        ) : null}

        {/* <button className="m-2 bg-pink-500 hover:bg-pink-400 text-white font-bold py-2 px-4 border-b-4 border-pink-700 hover:border-pink-500 rounded-xl" onClick={onHide}>Close Modal</button> */}
      </div>
    </>
  );
}

export default CenteredModal;
