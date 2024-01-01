import React from "react";
import Card1 from "../../components/card/card1/Card1";

import style from "./userDashboard.module.css";

// Image import
import cctv from "../../assets/cctv.png";

const UserDashboard = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "4rem 1rem",
        borderRadius: "30px 30px 30px 30px",
      }}
    >
      <h1>User Dashboard</h1>
      <div className={style.cards}>
        <Card1 imageLink={cctv} text="CCTV Surveillance" />
        <Card1 text="CCTV Location" />
        <Card1 text="Crime Evidence" />
      </div>
    </div>
  );
};

export default UserDashboard;
