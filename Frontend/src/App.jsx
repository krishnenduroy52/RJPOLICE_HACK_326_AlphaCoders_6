import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page element imports
import Home from "./page/Home";

// Component imports
import DetailsForm from "./components/userDetails/DetailsForm";

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/details" element={<DetailsForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
