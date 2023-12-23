import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onMessage, getToken } from "firebase/messaging";
import { messaging } from "./firebase";
// Page element imports
import Home from "./page/Home";
import DetailsForm from "./components/userDetails/DetailsForm";
import { useEffect, useState } from "react";

function App() {
  const [notificationPayload, setNotificationPayload] = useState([]);
  async function requestNotifyFunction() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const deviceToken = await getToken(messaging, {
        vapidKey:
          "BHnKjohhTwqxGmmcgVw6VNb5FCZH0rsggroROCIEWBrjS4EAk4WSlakKIKM3xnLh_z3BIDQPD0pi7QP-NtQWooU",
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
        setNotificationPayload([{ data: payload, open: true }]);
        setTimeout(() => setNotificationPayload([{ open: false }]), 6000);
      });
    }
  })();
  //

  useEffect(() => {
    requestNotifyFunction();
  }, []);

  useEffect(() => {
    if (notificationPayload.length > 0) {
      alert(
        notificationPayload[notificationPayload.length - 1].data.notification
          .body
      );
    }
  }, [notificationPayload]);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/details" element={<DetailsForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
