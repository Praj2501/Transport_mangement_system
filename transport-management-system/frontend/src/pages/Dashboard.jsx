import React from "react";
import DriverManager from "../components/DriverManager";
import VehicleManager from "../components/VehicleManager";
import TripManager from "../components/TripManager";

const Dashboard = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>🚚 Transport Management System</h1>
      <DriverManager />
      <hr />
      <VehicleManager />
      <hr />
      <TripManager />
    </div>
  );
};

export default Dashboard;
