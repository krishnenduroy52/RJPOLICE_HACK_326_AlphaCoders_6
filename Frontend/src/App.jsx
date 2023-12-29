import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onMessage, getToken } from "firebase/messaging";
import { messaging } from "./firebase";
// Page element imports
import Home from "./page/Home";
import DetailsForm from "./components/userDetails/DetailsForm";
import { useEffect, useState } from "react";
import Camera from "./components/Camera/Camera";
import Map from "./page/Map";
import SignIn from "./page/SignIn";

function App() {
  const [notificationPayload, setNotificationPayload] = useState("");
  async function requestNotifyFunction() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const deviceToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
      });
      console.log(deviceToken);
    } else if (permission === "denied") {
      alert("You have denied notification permission");
    }
  }

  // Krishnendu fix firebase foreground notification
  const onMessageListener = (async () => {
    const messagingResolve = await messaging;
    if (messagingResolve) {
      onMessage(messagingResolve, (payload) => {
        setNotificationPayload(payload);
        // setTimeout(() => setNotificationPayload([{ open: false }]), 6000);
      });
    }
  })();
  //

  useEffect(() => {
    requestNotifyFunction();
  }, []);

  useEffect(() => {
    if (notificationPayload !== "") {
      // alert(notificationPayload?.notification?.title);
      Swal.fire({
        title: `${notificationPayload?.notification?.title}`,
        text: `${notificationPayload?.notification?.body}`,
        width: 600,
        padding: "3em",
        color: "",
        background: "#fff url(/images/trees.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://media1.tenor.com/m/yfUbUdT-mi8AAAAC/dangerous-hours.gif")
          center center
          repeat
        `,
      });
      setNotificationPayload("");
    }
  }, [notificationPayload]);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/details" element={<DetailsForm />} />
          <Route path="/view/cctv" element={<Camera />} />
          {false ? <Route path="/map" element={<Map />} /> : null}
          <Route path="/auth/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
