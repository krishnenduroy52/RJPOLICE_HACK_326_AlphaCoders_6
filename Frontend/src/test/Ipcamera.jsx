import React, { useEffect, useRef } from "react";
import axios from "axios";

console.log("http://localhost:5000/video_feed");

function Ipcamera() {
  return (
    <div className="App">
      <h1>Webcam Feed</h1>
      <img src="http://localhost:5000/video_feed" alt="Webcam Feed" />
    </div>
  );
}

export default Ipcamera;
