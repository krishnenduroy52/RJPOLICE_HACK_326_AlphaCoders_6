import React from "react";
import styles from "./Card1.module.css";

// Image imports
import cctv from "../../../assets/cctv.png";

const Card1 = () => {
  return (
    <div>
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.number}>/01</div>
          <div className={styles.emptyRight}></div>
        </div>
        <div className={styles.cardBottom}>
          <img src={cctv} className={styles.image} />
          <p className={styles.text}>CCTV Surveillance</p>
        </div>
      </div>
    </div>
  );
};

export default Card1;
