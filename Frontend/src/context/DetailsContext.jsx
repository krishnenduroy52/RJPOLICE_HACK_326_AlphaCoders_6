import React, { createContext, useEffect, useState } from "react";

export const DetailsContext = createContext();

const DetailsProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    const admin = localStorage.getItem("isAdmin");
    setIsAdmin(admin === "true");
    setUser(JSON.parse(userDetails));
  }, []);
  return (
    <DetailsContext.Provider
      value={{ test: "Test", user: user, isAdmin: isAdmin }}
    >
      {children}
    </DetailsContext.Provider>
  );
};

export default DetailsProvider;
