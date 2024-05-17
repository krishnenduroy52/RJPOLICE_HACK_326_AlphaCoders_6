import React, { useState } from "react";
import styles from "./DisplayUserDetailsCard.module.css";
import { Link } from "react-router-dom";
import Button from "../../Button/Button";
import CameraModal from "../../CameraModal/CameraModal";

const DisplayUserDetailsCard = (props) => {
  const [showModal, setShowModal] = useState(false);
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
        <button onClick={()=>setShowModal(true)} className="m-2 bg-[#365486] hover:bg-[#4970b4] text-white font-bold py-2 px-4 border-b-4 border-[#293f65] hover:border-[#365486] rounded-xl">
            View CCTV
        </button>
        </div>
        {showModal ? <CameraModal camLink={props.userDetails.user.userCameraLink} closeModal={() => setShowModal(false)}/> : <></>}
      </div>
    </div>
  );
};

export default DisplayUserDetailsCard;
