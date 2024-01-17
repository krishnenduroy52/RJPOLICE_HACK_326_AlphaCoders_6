// import React, { useEffect, useRef } from "react";
// import axios from "axios";

// function Ipcamera() {
//   return (
//     <div className="App">
//       <h1>Webcam Feed</h1>
//       <img src="http://localhost:5000/video_feed" alt="Webcam Feed" />
//     </div>
//   );
// }

// export default Ipcamera;

import React, { useEffect, useState } from "react";
import axios from "axios";

function Ipcamera(props) {
  const [frame, setFrame] = useState("");
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        props.link
      );
      setFrame(response.data.frame);
      setError(null);
    } catch (error) {
      setError("Error fetching frame");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 123);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sendFrameToServer = async () => {
      if (frame) {
        console.log("Sending frame to server");
        try {
          // Make a POST request to your Flask backend
          await axios.post(
            "http://127.0.0.1:5000/testyolo",
            { frame },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } catch (error) {
          console.error("Error sending frame to server:", error);
          setError("Error sending frame to server");
        }
      }
    };

    // sendFrameToServer();
  }, [frame]);

  return (
    <div>
      {frame && (
        <img alt="Webcam Frame" src={`data:image/jpeg;base64,${frame}`} />
      )}
    </div>
  );
}

export default Ipcamera;
