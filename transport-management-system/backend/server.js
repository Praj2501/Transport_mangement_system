import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/transportDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Schemas
const driverSchema = new mongoose.Schema({ name: String, licenseNumber: String });
const vehicleSchema = new mongoose.Schema({ model: String, plateNumber: String });
const tripSchema = new mongoose.Schema({
  pickup: { address: String },
  dropoff: { address: String },
  status: { type: String, enum: ["pending", "done"], default: "pending" },
});

const Driver = mongoose.model("Driver", driverSchema);
const Vehicle = mongoose.model("Vehicle", vehicleSchema);
const Trip = mongoose.model("Trip", tripSchema);

// Helper function to log full collections
const logAllData = async () => {
  const drivers = await Driver.find();
  const vehicles = await Vehicle.find();
  const trips = await Trip.find();
  console.log("\n===== FULL DATABASE =====");
  console.log("Drivers:", drivers);
  console.log("Vehicles:", vehicles);
  console.log("Trips:", trips);
  console.log("=========================\n");
};

// ====================== DRIVER ROUTES ======================
app.get("/drivers", async (req, res) => res.json(await Driver.find()));

app.post("/drivers", async (req, res) => {
  const newDriver = await Driver.create(req.body);
  console.log("✅ Driver Added:", newDriver);
  await logAllData();
  res.json(newDriver);
});

app.delete("/drivers/:id", async (req, res) => {
  await Driver.findByIdAndDelete(req.params.id);
  console.log("❌ Driver Deleted, ID:", req.params.id);
  await logAllData();
  res.json({ message: "Driver deleted" });
});

// ====================== VEHICLE ROUTES ======================
app.get("/vehicles", async (req, res) => res.json(await Vehicle.find()));

app.post("/vehicles", async (req, res) => {
  const newVehicle = await Vehicle.create(req.body);
  console.log("✅ Vehicle Added:", newVehicle);
  await logAllData();
  res.json(newVehicle);
});

app.delete("/vehicles/:id", async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  console.log("❌ Vehicle Deleted, ID:", req.params.id);
  await logAllData();
  res.json({ message: "Vehicle deleted" });
});

// ====================== TRIP ROUTES ======================
app.get("/trips", async (req, res) => res.json(await Trip.find()));

app.post("/trips", async (req, res) => {
  const newTrip = await Trip.create(req.body);
  console.log("✅ Trip Added:", newTrip);
  await logAllData();
  res.json(newTrip);
});

app.put("/trips/:id", async (req, res) => {
  const { status } = req.body;
  const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, { status }, { new: true });
  console.log("🔄 Trip Status Updated:", updatedTrip);
  await logAllData();
  res.json(updatedTrip);
});

app.delete("/trips/:id", async (req, res) => {
  await Trip.findByIdAndDelete(req.params.id);
  console.log("❌ Trip Deleted, ID:", req.params.id);
  await logAllData();
  res.json({ message: "Trip deleted" });
});

// ====================== SERVER ======================
app.listen(4000, () => console.log("🚀 Server running on port 4000"));
