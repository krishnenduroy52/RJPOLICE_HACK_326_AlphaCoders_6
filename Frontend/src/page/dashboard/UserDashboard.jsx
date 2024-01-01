import React from "react";
import Card1 from "../../components/card/card1/Card1";

const UserDashboard = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "4rem 1rem",
        borderRadius: "30px 30px 30px 30px",
      }}
    >
      <h1>User Dashboard</h1>
      <Card1 />
    </div>
  );
};

export default UserDashboard;
