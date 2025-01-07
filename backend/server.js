import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();
app.use(express.json()); //allows json data in req.body

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the backend");
});

app.listen(5000, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${process.env.PORT} 🚀`);
});
