import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./cameraadmin.module.css";
import DisplayUserDetailsCard from "../../components/card/DisplayUserDetailsCard/DisplayUserDetailsCard";
import { getAllUsersRoute } from "../../Utils/APIRoutes.js";
import axios from "axios";
import Loader from "../../components/Loaders/Loader.jsx";

const CameraAdmin = () => {
  const videoRef = useRef(null);

  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await axios
        .get(getAllUsersRoute)
        .then((res) => res.data)
        .catch((err) => console.log(err));
      setUsers(data.userDetails);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startCamera();

    return () => {
      const stream = videoRef.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      }
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#DCF2F1",
        padding: "4rem 1rem",
        borderRadius: "30px 30px 30px 30px",
      }}
    >
      <div className={style.one}>
        <h1 className={style.headline}>Live CCTV Surveillance</h1>
      </div>
      <div className={style.wrapper}>
        <div className={style.video}>
          <h1>CCTV Footage</h1>
          <video
            ref={videoRef}
            autoPlay
            style={{ width: "100%", maxWidth: "400px", borderRadius: "5px" }}
          />
        </div>
        <div>
          {!users ? (
            <>
              <Loader />
            </>
          ) : (
            <>
              {/* loop through the users and display the card */}
              {users.map((user) => (
                <DisplayUserDetailsCard key={user._id} userDetails={user} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraAdmin;
