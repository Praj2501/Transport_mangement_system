import React, { useState, useEffect } from "react";
import api from "./api";

function App() {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [trips, setTrips] = useState([]);

  const [driverForm, setDriverForm] = useState({ name: "", licenseNumber: "" });
  const [vehicleForm, setVehicleForm] = useState({ model: "", plateNumber: "" });
  const [tripForm, setTripForm] = useState({ pickup: "", dropoff: "" });

  // Fetch all data
  const fetchData = async () => {
    const d = await api.get("/drivers");
    const v = await api.get("/vehicles");
    const t = await api.get("/trips");
    setDrivers(d.data);
    setVehicles(v.data);
    setTrips(t.data);
  };

  useEffect(() => { fetchData(); }, []);

  // Add handlers
  const addDriver = async (e) => {
    e.preventDefault();
    await api.post("/drivers", driverForm);
    setDriverForm({ name: "", licenseNumber: "" });
    fetchData();
  };

  const addVehicle = async (e) => {
    e.preventDefault();
    await api.post("/vehicles", vehicleForm);
    setVehicleForm({ model: "", plateNumber: "" });
    fetchData();
  };

  const addTrip = async (e) => {
    e.preventDefault();
    await api.post("/trips", {
      pickup: { address: tripForm.pickup },
      dropoff: { address: tripForm.dropoff },
    });
    setTripForm({ pickup: "", dropoff: "" });
    fetchData();
  };

  // Delete handlers
  const deleteDriver = async (id) => { await api.delete(`/drivers/${id}`); fetchData(); };
  const deleteVehicle = async (id) => { await api.delete(`/vehicles/${id}`); fetchData(); };
  const deleteTrip = async (id) => { await api.delete(`/trips/${id}`); fetchData(); };

  // Toggle trip status
  const toggleTripStatus = async (id, status) => {
    const newStatus = status === "pending" ? "done" : "pending";
    await api.put(`/trips/${id}`, { status: newStatus });
    fetchData();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🚛 Transport Management System</h1>

      {/* Drivers Section */}
      <section>
        <h2>Drivers</h2>
        <form onSubmit={addDriver}>
          <input placeholder="Name" value={driverForm.name} onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })} />
          <input placeholder="License Number" value={driverForm.licenseNumber} onChange={(e) => setDriverForm({ ...driverForm, licenseNumber: e.target.value })} />
          <button>Add Driver</button>
        </form>
        <ul>
          {drivers.map(d => (
            <li key={d._id}>
              {d.name} ({d.licenseNumber})
              <button onClick={() => deleteDriver(d._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Vehicles Section */}
      <section>
        <h2>Vehicles</h2>
        <form onSubmit={addVehicle}>
          <input placeholder="Model" value={vehicleForm.model} onChange={(e) => setVehicleForm({ ...vehicleForm, model: e.target.value })} />
          <input placeholder="Plate Number" value={vehicleForm.plateNumber} onChange={(e) => setVehicleForm({ ...vehicleForm, plateNumber: e.target.value })} />
          <button>Add Vehicle</button>
        </form>
        <ul>
          {vehicles.map(v => (
            <li key={v._id}>
              {v.model} ({v.plateNumber})
              <button onClick={() => deleteVehicle(v._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Trips Section */}
      <section>
        <h2>Trips</h2>
        <form onSubmit={addTrip}>
          <input placeholder="Pickup" value={tripForm.pickup} onChange={(e) => setTripForm({ ...tripForm, pickup: e.target.value })} />
          <input placeholder="Dropoff" value={tripForm.dropoff} onChange={(e) => setTripForm({ ...tripForm, dropoff: e.target.value })} />
          <button>Add Trip</button>
        </form>
        <ul>
          {trips.map(t => (
            <li key={t._id}>
              {t.pickup?.address} → {t.dropoff?.address} ({t.status})
              <button onClick={() => toggleTripStatus(t._id, t.status)}>
                Mark {t.status === "pending" ? "Done" : "Pending"}
              </button>
              <button onClick={() => deleteTrip(t._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
