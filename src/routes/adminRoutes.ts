import express from "express";
import { verifyToken, requireRole } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/admin", verifyToken, requireRole("admin"), (req, res) => {
  res.status(200).json({ message: "Bienvenido, administrador" });
});

export default router;
