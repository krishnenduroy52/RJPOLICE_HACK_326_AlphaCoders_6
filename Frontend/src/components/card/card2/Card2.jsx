/* eslint-disable react/prop-types */
import React from "react";
import style from "./card2.module.css";
import { Link } from "react-router-dom";

const Card2 = (props) => {
  const text = props.text;
  const imageLink = props.imageLink;
  const bodyText = props.bodyText;
  const pathto = props.pathto;
  return (
    <Link to={pathto}>
      <div className={style.card}>
        <div className={style.icon}>
          <img src={imageLink} className={style.img} />
        </div>
        <div>
        <strong>{text}</strong>
        <div className={style.card__body}>{bodyText}</div>
        </div>
      </div>
    </Link>
  );
};

export default Card2;
