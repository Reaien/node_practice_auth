import { AppError } from "./AppError";
import jwt from "jsonwebtoken";

export const handleJwtError = (error: jwt.JsonWebTokenError) => {
  if (error instanceof jwt.TokenExpiredError) {
    throw new AppError("Token expirado", 401);
  }

  if (error instanceof jwt.JsonWebTokenError) {
    throw new AppError("Token inválido", 401);
  }

  throw new AppError("Error interno al verificar el token", 500);
};
