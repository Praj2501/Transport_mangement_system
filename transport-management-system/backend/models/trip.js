import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  pickup: {
    address: String,
  },
  dropoff: {
    address: String,
  },
  status: { type: String, default: "pending" },
});

export default mongoose.model("Trip", tripSchema);
