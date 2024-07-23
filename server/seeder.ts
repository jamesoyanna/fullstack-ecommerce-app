import express, {Request, Response} from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from "cors";
import {notFound, errorHandler} from "./middleware/errorMiddleware";
import morgan from "morgan";


//Routes
import userRoutes from "./routes/userRoutes";

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());

//Middleware to accept JSON in body
app.use(express.json());

//Morgan logging
app.use(morgan("dev"))

dotenv.config();
connectDB();

app.get("/", (req: Request, res: Response) => {
    res.send("API IS RUNNING...");
  });

  // Use routes
app.use("/api/products/", productRoutes);
app.use("/api/users/", userRoutes);

//make uploads folder static
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

//Use Middleware
app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});