import { NextFunction, Request, Response } from "express";
import { UserPayload } from "../interfaces/express";
import jwt from "jsonwebtoken";
import { handleJwtError } from "../utils/errors/JwtError";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error(
    "Error: JWT_SECRET no está definida en las variables de entorno."
  );
  process.exit(1); // Detiene la aplicación si el secreto no está configurado
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Obtiene el token que entrega el register al cortar el header del token
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  //si no hay token devolver respuestas
  if (!token) {
    res.status(401).json({ message: "Token no proporcionado" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error al varificar el token", error); // Es bueno loguear el error real
    handleJwtError(error as jwt.JsonWebTokenError);
  }
};

export const requireRole = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Verifica que req.user exista (verifyToken debió añadirlo)
    // y que el rol sea el correcto
    if (!req.user || req.user.role !== requiredRole) {
      // No uses 'return' aquí
      res.status(403).json({ message: "Permiso denegado: Rol insuficiente" });
      return; // Detiene la ejecución
    }
    // Si el rol es correcto, pasa al siguiente middleware o controlador
    next();
  };
};
