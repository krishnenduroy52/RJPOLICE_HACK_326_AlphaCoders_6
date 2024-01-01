import React from "react";
import styles from "./Card1.module.css";

const Card1 = ({ text, imageLink }) => {
  return (
    <div>
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.number}>/01</div>
          <div className={styles.emptyRight}></div>
        </div>
        <div className={styles.cardBottom}>
          <img src={imageLink} className={styles.image} />
          <p className={styles.text}>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Card1;
