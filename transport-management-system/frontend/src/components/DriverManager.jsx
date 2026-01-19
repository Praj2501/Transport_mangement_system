import React, { useState, useEffect } from "react";
import api from "../api";

const DriverManager = () => {
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({ name: "", licenseNumber: "", phone: "" });

  const fetchDrivers = async () => {
    const res = await api.get("/drivers");
    setDrivers(res.data);
  };

  const addDriver = async (e) => {
    e.preventDefault();
    await api.post("/drivers", form);
    setForm({ name: "", licenseNumber: "", phone: "" });
    fetchDrivers();
  };

  const deleteDriver = async (id) => {
    await api.delete(`/drivers/${id}`);
    fetchDrivers();
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <div>
      <h2>Drivers</h2>
      <form onSubmit={addDriver}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="License No."
          value={form.licenseNumber}
          onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })}
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <button>Add Driver</button>
      </form>

      <ul>
        {drivers.map((d) => (
          <li key={d._id}>
            {d.name} ({d.licenseNumber}) — {d.phone}
            <button onClick={() => deleteDriver(d._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DriverManager;
