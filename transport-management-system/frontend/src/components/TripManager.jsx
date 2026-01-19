import React, { useEffect, useState } from "react";
import api from "../api";

const TripManager = () => {
  const [trips, setTrips] = useState([]);
  const [form, setForm] = useState({ pickup: "", dropoff: "", status: "pending" });

  const fetchTrips = async () => {
    const res = await api.get("/trips");
    setTrips(res.data);
  };

  const addTrip = async (e) => {
    e.preventDefault();
    await api.post("/trips", {
      pickup: { address: form.pickup },
      dropoff: { address: form.dropoff },
      status: form.status,
    });
    setForm({ pickup: "", dropoff: "", status: "pending" });
    fetchTrips();
  };

  const updateStatus = async (id, newStatus) => {
    await api.put(`/trips/${id}`, { status: newStatus });
    fetchTrips();
  };

  const deleteTrip = async (id) => {
    await api.delete(`/trips/${id}`);
    fetchTrips();
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div>
      <h2>Trips</h2>
      <form onSubmit={addTrip}>
        <input
          placeholder="Pickup"
          value={form.pickup}
          onChange={(e) => setForm({ ...form, pickup: e.target.value })}
        />
        <input
          placeholder="Dropoff"
          value={form.dropoff}
          onChange={(e) => setForm({ ...form, dropoff: e.target.value })}
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
        <button>Add Trip</button>
      </form>

      <ul>
        {trips.map((t) => (
          <li key={t._id}>
            {t.pickup?.address} → {t.dropoff?.address}{" "}
            <strong
              style={{
                color: t.status === "done" ? "green" : "orange",
              }}
            >
              ({t.status})
            </strong>
            <button
              onClick={() =>
                updateStatus(t._id, t.status === "pending" ? "done" : "pending")
              }
            >
              Mark {t.status === "pending" ? "Done" : "Pending"}
            </button>
            <button onClick={() => deleteTrip(t._id)} style={{ color: "red" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripManager;
