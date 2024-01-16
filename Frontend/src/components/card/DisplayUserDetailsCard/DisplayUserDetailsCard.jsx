import React from "react";
import styles from "./DisplayUserDetailsCard.module.css";
import { Link } from "react-router-dom";
import Button from "../../Button/Button";

const DisplayUserDetailsCard = (props) => {
  console.log(props);
  return (
    <div>
      <div className={styles.container}>
        <div className="username">
          <h1>{props.userDetails.user.firstname}</h1>
        </div>
        <div className="email">
          <h1>{props.userDetails.user.email}</h1>
        </div>
        <div className="location">
          <h1>
            {props.userDetails.camera.cameraLongitude},{" "}
            {props.userDetails.camera.cameraLatitude}
          </h1>
        </div>
        <div className="">
          <Link to="/admin/view/cctv">
            {/* <button className="m-2 bg-pink-500 hover:bg-pink-400 text-white font-bold py-2 px-4 border-b-4 border-pink-700 hover:border-pink-500 rounded-xl">
              View CCTV
            </button> */}
            <Button text="View CCTV"/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DisplayUserDetailsCard;
