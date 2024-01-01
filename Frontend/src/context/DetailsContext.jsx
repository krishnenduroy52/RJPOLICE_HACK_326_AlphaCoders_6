import React, { createContext, useEffect, useState } from "react";

export const DetailsContext = createContext();

const DetailsProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [locationValues, setLocationValues] = useState(null);

  const handleLngLatRotationValue = (values) => {
    console.log(values);
    setLocationValues(values);
  }

  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    const admin = localStorage.getItem("isAdmin");
    setIsAdmin(admin === "true");
    setUser(JSON.parse(userDetails));
  }, []);
  return (
    <DetailsContext.Provider
      value={{ test: "Test", user: user, isAdmin: isAdmin, handleLngLatRotationValue, locationValues}}
    >
      {children}
    </DetailsContext.Provider>
  );
};

export default DetailsProvider;
