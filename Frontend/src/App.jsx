import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";
// Page element imports
import Home from "./page/Home";
import DetailsForm from "./components/userDetails/DetailsForm";
import { useEffect } from "react";

function App() {

  async function requestNotifyFunction() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const deviceToken = await getToken(messaging, { vapidKey: "BHnKjohhTwqxGmmcgVw6VNb5FCZH0rsggroROCIEWBrjS4EAk4WSlakKIKM3xnLh_z3BIDQPD0pi7QP-NtQWooU" });
      console.log(deviceToken);
    }
    else if (permission === 'denied') {
      alert("You have denied notification permission");
    }
  }

  useEffect(() => {
    requestNotifyFunction();
  }, [])
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
