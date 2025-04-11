import { Request, Response } from "express";
import { createUser, generateTokenForRegister } from "../services/auth.service";
import { AppError } from "../utils/errors/AppError";

export const register = async (req: Request, resp: Response) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      resp.status(400).json({ message: "El email es obligatorio" });
      return;
    }

    if (!password) {
      resp.status(400).json({ message: "El password es obligatorio" });
      return;
    }

    //refactorizado y movido a auth.service
    const user = await createUser(email, password);
    console.log(user);

    //token para autenticar al registrar y así dejar logueado
    //pasamos el usuario del registro y se lo pasamos al token y este retornara el usuario con su token que expira en 1 hora
    const token = generateTokenForRegister(user);
    //ahora definimos la respuesta
    resp.status(201).json({ token });
  } catch (error: any) {
    if (error instanceof AppError) {
      resp.status(error.statusCode).json({ message: error.message });
    } else {
      console.log(error);
      resp.status(500).json({ error: "Error al registrar el usuario" });
    }
  }
};
