import React from "react";
import styles from "./Card1.module.css";
import { Link } from "react-router-dom";

const Card1 = ({ text, imageLink, width, height, to }) => {
  return (
    <Link to={to}>
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.number}>/01</div>
          <div className={styles.emptyRight}></div>
        </div>
        <div className={styles.cardBottom}>
          <img
            src={imageLink}
            className={styles.image}
            width={width}
            height={height}
          />
          <p className={styles.text}>{text}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card1;
