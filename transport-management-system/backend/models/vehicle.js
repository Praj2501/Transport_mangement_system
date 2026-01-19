import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  plateNumber: String,
  model: String,
  type: String,
});

export default mongoose.model("Vehicle", vehicleSchema);
