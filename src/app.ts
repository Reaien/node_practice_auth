import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";

const app = express();

app.use(express.json());

//Routes
app.use("/auth", authRoutes);
//AUtenticación
app.use("/test", adminRoutes);
//User

console.log("hola desde nodecito");

export default app;
