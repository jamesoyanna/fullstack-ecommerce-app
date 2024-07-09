
import express, { Request, Response } from "express";
import cors from 'cors';

import morgan from 'morgan';

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());

// Middleware to accept JSON in body
app.use(express.json());

// Morgan logging
app.use(morgan("dev"));


app.get("/", (req: Request, res: Response) => {
  res.send("API IS RUNNING...");
});


app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});