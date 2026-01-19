import React, { useState, useEffect } from "react";
import api from "../api";

const VehicleManager = () => {
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({ numberPlate: "", model: "", capacity: "" });

  const fetchVehicles = async () => {
    const res = await api.get("/vehicles");
    setVehicles(res.data);
  };

  const addVehicle = async (e) => {
    e.preventDefault();
    await api.post("/vehicles", form);
    setForm({ numberPlate: "", model: "", capacity: "" });
    fetchVehicles();
  };

  const deleteVehicle = async (id) => {
    await api.delete(`/vehicles/${id}`);
    fetchVehicles();
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div>
      <h2>Vehicles</h2>
      <form onSubmit={addVehicle}>
        <input
          placeholder="Number Plate"
          value={form.numberPlate}
          onChange={(e) => setForm({ ...form, numberPlate: e.target.value })}
        />
        <input
          placeholder="Model"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
        />
        <input
          placeholder="Capacity"
          type="number"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
        />
        <button>Add Vehicle</button>
      </form>

      <ul>
        {vehicles.map((v) => (
          <li key={v._id}>
            {v.numberPlate} — {v.model} ({v.capacity})
            <button onClick={() => deleteVehicle(v._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleManager;
