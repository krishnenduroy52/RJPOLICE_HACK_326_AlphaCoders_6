import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onMessage, getToken } from "firebase/messaging";
import { messaging } from "./firebase";
// Page element imports
import Home from "./page/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import Camera from "./components/Camera/Camera";
import Map from "./page/Map";
import SignIn from "./page/SignIn";
import CameraUser from "./page/CameraUser";
import CameraAdmin from "./page/CameraAdmin";
import Error from "./page/Error";
import DetailsForm from "./page/userDetails/DetailsForm";

// dashboard
import UserDashboard from "./page/dashboard/UserDashboard";
import AdminDashboard from "./page/dashboard/AdminDashboard";

// toast

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Ipcamera from "./test/Ipcamera";

function App() {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin");
    setIsAdmin(admin === "true");
  }, []);

  const [notificationPayload, setNotificationPayload] = useState("");
  async function requestNotifyFunction() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const deviceToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
      });
      console.log("deviceID", deviceToken);
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
      <ToastContainer position="bottom-right" theme="colored" />
      <Router>
        <Navbar isAdmin={isAdmin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/registration" element={<DetailsForm />} />
          {/* <Route path="/admin/cctv" element={<Camera />} /> */}
          {isAdmin ? (
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          ) : (
            <Route path="/user/dashboard" element={<UserDashboard />} />
          )}

          {/* Admin Route */}
          <Route path="/admin/map" element={<Map />} />
          <Route path="/admin/view/cctv" element={<CameraAdmin />} />

          {/* Auth */}
          <Route path="/auth/signin" element={<SignIn />} />

          {/* Test */}
          <Route path="/test/cctv" element={<Ipcamera />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
