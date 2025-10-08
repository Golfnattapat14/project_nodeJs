const express = require("express");
const router = express.Router();
const Register = require("../models/auth");
const { default: mongoose } = require("mongoose");

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
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid ID format" });

    const doc = await Register.findById(id);
    if (!doc) {
      return res.status(404).json({ message: "Not found!" });
    }
    res.json(doc);
  } catch (err) {
    console.error("GET /:id error:", err.message);
    res.status(500).json({ message: "Sever Error" });
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
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const { name, phoneNumber } = req.body || {};
    if (!name || !phoneNumber) {
      return res
        .status(400)
        .json({ message: "name & phoneNumber are required for PUT" });
    }

    const update = await Register.findByIdAndUpdate(
      id,
      { name, phoneNumber },
      { new: true, runValidators: true }
    );

    if (!update) {
      return res.status(404).json({ message: "Not Found!" });
    }

    return res.json(update);
  } catch (err) {
    console.error("PUT /:id error:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
});

// PATCH :Id
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const allowed = ["name", "phoneNumber"];
    const patch = {};

    for (const key of Object.keys(req.body || {})) {
      const val = req.body[key];
      if (allowed.includes(key)) {
        patch[key] = req.body[key];
      }
    }
    if (Object.keys(patch).length === 0) {
      return res.status(400).json({ message: "No allowed fields to update" });
    }

    const update = await Register.findByIdAndUpdate(id, patch, {
      new: true,
      runValidators: true,
    });

    if (!update) {
      return res.status(404).json({ message: "Not Found!" });
    }
    return res.json(update);
  } catch (err) {
    console.err("/PATCH /:id error:", err);
    res.status(500).json({ message: err.message || "Sever Error" });
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
