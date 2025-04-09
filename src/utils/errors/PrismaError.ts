import { AppError } from "./AppError";

export const handlePrismaError = (error: any) => {
  if (error?.code === "P2002" && error?.meta?.target?.includes("email")) {
    throw new AppError("El email ya está en uso", 400);
  }

  // Si no es un error conocido, lanza un error genérico
  throw new AppError("Error interno del servidor", 500);
};
