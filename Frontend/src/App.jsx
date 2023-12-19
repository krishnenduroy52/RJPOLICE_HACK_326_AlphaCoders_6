import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



// Page element imports
import Home from "./page/Home";

// Component imports
import DetailsForm from "./components/userDetails/DetailsForm";
import ImageLocationTracker from "./components/location/ImageLocationTracker";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/details" element={<DetailsForm />} />
          <Route path="/location" element={<ImageLocationTracker />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
