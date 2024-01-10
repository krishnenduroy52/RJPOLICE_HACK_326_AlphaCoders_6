import React, { useState } from "react";
import style from "./cardEvidence.module.css";
import EvidenceToMap from "../MapCard/EvidenceToMap";

function CenteredModal({ show, onHide, coordinates, userId }) {
  return (
    <>
      <div style={{ display: show ? "block" : "none" }} className={style.backdropStyle}></div>
      <div style={{ display: show ? "block" : "none" }} className={style.modalStyle}>
        {/* Close button */}
        <button
          onClick={onHide}
          className={style.closeButton}
        >
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className={style.modalContainer}>
          <h1 className="text-xl font-bold">Crime Details</h1>
          <h2 className="text-l">Modal Subheading</h2>
        </div>
        {show ? <EvidenceToMap coordinates={coordinates} userID={userId} /> : null}

        {/* <button className="m-2 bg-pink-500 hover:bg-pink-400 text-white font-bold py-2 px-4 border-b-4 border-pink-700 hover:border-pink-500 rounded-xl" onClick={onHide}>Close Modal</button> */}
      </div>
    </>
  );
}


const CardEvidence = ({ evi }) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className={style.card}>
      <div className={style.imageContainer}>
        <img src={evi.image} className={style.image} />
      </div>
      <div className={style.textContainer}>
        <h1>{evi.crime}</h1>
        <div className={style.informationContainer}>
          <div>
            <p>Time: {evi.time}</p>
            <p>UserID: {evi.userid}</p>
          </div>
          <div>
            <button onClick={() => setModalShow(true)} className="m-2 bg-pink-500 hover:bg-pink-400 text-white font-bold py-2 px-4 border-b-4 border-pink-700 hover:border-pink-500 rounded-xl">Crime Location</button>
          </div>
        </div>
      </div>
      <CenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        coordinates={evi.location}
        userId = {evi.userid}
      />
    </div>
  );
};

export default CardEvidence;
