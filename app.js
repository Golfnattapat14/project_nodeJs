require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/Products");
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB error:", err));

///Routes
//get ทดสอบ
app.get("/", (req, res) => res.send("Hello MongoDB!"));

//post
app.post("/api/products", async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = new Product({ name, price });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get products
app.get("/api/products",async (req,res)=>{
  const allProducts = await Product.find();
    res.json(allProducts);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
