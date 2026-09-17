import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("User from Dashboard:", user);
  return <div>Dashboard</div>;
};

export default Dashboard;
