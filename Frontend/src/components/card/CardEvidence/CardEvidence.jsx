import React, { useState } from "react";
import style from "./cardEvidence.module.css";
import CenteredModal from "../CenteredModal/CenteredModal";
import EvidenceToMap from "../MapCard/EvidenceToMap";

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
            {/* <p>UserID: {evi.userid}</p> */}
          </div>
          <div>
            <button
              onClick={() => setModalShow(true)}
              className="m-2 bg-[#365486] hover:bg-[#4970b4] text-white font-bold py-2 px-4 border-b-4 border-[#293f65] hover:border-[#365486] rounded-xl"
            >
              Crime Location
            </button>
          </div>
        </div>
      </div>
      <CenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        coordinates={evi.location}
        userId={evi.userid}
      />
    </div>
  );
};

export default CardEvidence;
