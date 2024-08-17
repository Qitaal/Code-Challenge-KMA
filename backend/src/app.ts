import express, { Application } from "express";
import userRoutes from "./routes/userRoutes";
import pool from "./config/database";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);

pool.connect((err) => {
  if (err) {
    console.error("Database connection error", err.stack);
  } else {
    console.log("Database connected");
  }
});

export default app;
