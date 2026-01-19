import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: String,
  phone: String,
  licenseNumber: String,
  status: { type: String, default: "available" },
});

export default mongoose.model("Driver", driverSchema);
