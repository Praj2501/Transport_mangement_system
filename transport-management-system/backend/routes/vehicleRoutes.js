import express from "express";
import Vehicle from "../models/vehicle.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const vehicle = await Vehicle.create(req.body);
  res.json(vehicle);
});

router.get("/", async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
});

export default router;
