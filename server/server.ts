import express, { Express, Request, Response } from "express";
import cors from 'cors';
import connectDB from "./config/db";
import dotenv from 'dotenv';
import morgan from 'morgan';
import productRoutes from "./routes/productRoutes";



//Routes
import userRoutes from "./routes/userRoutes";

const PORT = process.env.PORT || 4000;
const app = express();

// Middleware to accept JSON in body
app.use(cors());
app.use(express.json());

// Morgan logging
app.use(morgan("dev"));

//connecting to DB
dotenv.config()
connectDB()

//Routes
app.get("/", (req: Request, res: Response) => {
  res.send("API IS RUNNING...");
});

app.use("/api/users/", userRoutes);

app.use("/api/products/", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});