import express from "express";
import Driver from "../models/driver.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const driver = await Driver.create(req.body);
  res.json(driver);
});

router.get("/", async (req, res) => {
  const drivers = await Driver.find();
  res.json(drivers);
});

export default router;
