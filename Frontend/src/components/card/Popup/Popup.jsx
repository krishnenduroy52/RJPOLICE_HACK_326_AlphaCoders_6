import React from 'react';

const Popup = ({ user, onViewCCTVClick }) => {
    const createField = (label, value) => (
        <div style={{ marginBottom: "5px" }}>
          <span style={{ fontWeight: "bold" }}>{label}: </span>
          <span>{value}</span>
        </div>
      );

  return (
    <div className="marker" style={{ border: "2px solid green", borderRadius: "10px", width: "200px", height: "150px", backgroundSize: "cover", position: "relative" }}>
      <div style={{ padding: "5px" }}>
        {createField("Name", user.name)}
        {createField("Phone", user.phone)}
        {createField("CameraID", user.cameraId)}
        <button
          onClick={() => onViewCCTVClick(user.camLink)}
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            padding: "10px",
            position: "absolute",
            borderRadius: "10px",
            backgroundColor: "#13EC88",
            color: "white",
            border: "none",
            cursor: "pointer",
            outline: "none"
          }}
        >
          View CCTV
        </button>
      </div>
    </div>
  );
};

export default Popup;

