import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoutes from "./routes/auth/authRoutes";
import adminRoutes from "./routes/admin/adminRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

//Routes
app.use("/auth", authRoutes);
//AUtenticación
app.use("/test", adminRoutes);
//User

//Middleware global de manejor de errores
app.use(errorHandler);

console.log("hola desde nodecito");

export default app;
