const express = require("express");
const router = express.Router();
const Register = require("../models/auth");

// GET all
router.get("/", async (req, res) => {
  try {
    const all = await Register.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//GET :Id
router.get("/:id", async (req, res) => {
  try {
    const all = await Register.find();
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ message: "Cant Pull By Id" });
  }
});

// POST Register
router.post("/", async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;

    const newRegister = new Register({ name, phoneNumber });
    await newRegister.save();

    res.status(201).json(newRegister);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//PUT register :Id
router.put("/", async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;

    const update = await Register.findByIdAndUpdate(
      req.params.id,
      { name, phoneNumber },
      { new: true, runValidators: true }
    );

    if (!update) return res.status(404).json({ message: "Not Found!" });
    res.json(update);
  } catch (err) {
    res.status(400).json({ message: err.message || "Invalid ID or req" });
  }
});

//PUT PATCH :Id
router.patch("/:id", async (req, res) => {
  try {
    const allowed = ["name", "phoneNumber"];
    const patch = {};
    for (const key of Object.keys(req.body || {})) {
      if (!allowed.includes(key)) patch[key] = req.body[key];
    }
    const update = await Register.findByIdAndUpdate(req.params.id, patch, {
      new: true,
      runValidators: true,
    });

    if (!update) return res.status(404).json({ message: "Not Found!" });
  } catch (err) {
    res.status(400).json({ message: err.message || "Invalid ID or req" });
  }
});

//Delete :Id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Register.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not Found!" });
    res.json({ message: "Deleted", id: deleted._id });
  } catch (err) {
    res.status(400).json({ message: err.message || "Invaid ID or req" });
  }
});

module.exports = router;
