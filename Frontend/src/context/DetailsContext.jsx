import React, { createContext, useEffect, useState } from "react";

export const DetailsContext = createContext();

const DetailsProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    setUser(JSON.parse(userDetails));
  }, []);
  return (
    <DetailsContext.Provider value={{ test: "Test", user: user }}>
      {children}
    </DetailsContext.Provider>
  );
};

export default DetailsProvider;
