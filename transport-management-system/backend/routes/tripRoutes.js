import express from "express";
import Trip from "../models/trip.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const trip = await Trip.create(req.body);
  res.json(trip);
});

router.get("/", async (req, res) => {
  const trips = await Trip.find();
  res.json(trips);
});

export default router;
