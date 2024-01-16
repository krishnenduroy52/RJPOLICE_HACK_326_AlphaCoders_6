import React from "react";
import Card1 from "../../components/card/card1/Card1";

import style from "./userDashboard.module.css";

// Image import
import cctv from "../../assets/cctv.png";
import CameraUser from "../CameraUser";

const UserDashboard = () => {
  return (
    <div
      style={{
        backgroundColor: "#DCF2F1",
        padding: "4rem 1rem",
        borderRadius: "30px 30px 30px 30px",
      }}
      className={style.container}
    >
      <div className={style.wrapper}>
        <h1 className={style.heading}>User Dashboard</h1>
        <div className={style.camera}>
          <CameraUser />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
