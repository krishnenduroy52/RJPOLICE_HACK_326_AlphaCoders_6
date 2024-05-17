import React, { createContext, useEffect, useState } from "react";

export const DetailsContext = createContext();

const DetailsProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [locationValues, setLocationValues] = useState(null);
  const [evidence, setEvidence] = useState([]);

  useEffect(() => {
    const fetchEvidence = async () => {
      try {
        const response = await fetch("http://localhost:8000/crime/evidence");
        const data = await response.json();
        const reversedEvidence = data.crimeEvidence.reverse();
        setEvidence(data.crimeEvidence);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvidence();
  }, []);

  const handleLngLatRotationValue = (values) => {
    console.log(values);
    setLocationValues(values);
  };

  useEffect(() => {
    console.log("details context");
    const userDetails = localStorage.getItem("user");
    const admin = localStorage.getItem("isAdmin");
    if (admin === "true") {
      setIsAdmin(true);
    } else if (admin === "false") {
      setIsAdmin(false);
    } else {
      setIsAdmin(null);
    }
    // console.log(JSON.parse(userDetails).camera);
    setUser(JSON.parse(userDetails));
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <DetailsContext.Provider
      value={{
        test: "Test",
        user: user,
        isAdmin: isAdmin,
        handleLngLatRotationValue,
        locationValues,
        evidence,
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
};

export default DetailsProvider;
