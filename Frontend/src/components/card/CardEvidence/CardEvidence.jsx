import React from "react";
import style from "./cardEvidence.module.css";

const CardEvidence = ({ evi }) => {
  return (
    <div className={style.card}>
      <div className={style.imageContainer}>
        <img src={evi.image} className={style.image} />
      </div>
      <div className={style.textContainer}>
        <h1>{evi.crime}</h1>
        <div>
          <p>Longatude: {evi.location.longitude}</p>
          <p>Latitude: {evi.location.latitude}</p>
          <p>Time: {evi.time}</p>
          <p>Camera Owner contact number:</p>
        </div>
      </div>
    </div>
  );
};

export default CardEvidence;
