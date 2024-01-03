import React from "react";
import style from "./card2.module.css";
import { Link } from "react-router-dom";

const Card2 = ({ text, imageLink, bodyText, pathto }) => {
  return (
    <Link to={pathto}>
      <div className={style.card}>
        <div class={style.icon}>
          <img src={imageLink} className={style.img} />
        </div>
        <strong>{text}</strong>
        <div className={style.card__body}>{bodyText}</div>
        <span>Open Now</span>
      </div>
    </Link>
  );
};

export default Card2;
