import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors/AppError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    console.error(err); // Log del error para depuración
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
