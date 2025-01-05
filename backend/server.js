import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from the backend");
});

app.listen(5000, () => {
  connectDB();
  console.log("Server is running on http://localhost:5000 🚀");
});

app.post("/products", async (req, res) => {
  const product = await req.body;

  if (product.name === "" || product.price === "" || product.image === "") {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.log(`Error in creating a product: ${error.message}`);
    res.status(500).json({ success: false, message: "server error" });
  }
});
