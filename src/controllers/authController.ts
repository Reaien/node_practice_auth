import { Request, Response } from "express";
import { hashPassword } from "../services/password.service";
import prisma from "../models/user";
import { generateToken } from "../services/auth.service";

export const register = async (req: Request, resp: Response) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);

    const user = await prisma.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    console.log(user);

    //token para autenticar al registrar y así dejar logueado
    //pasamos el usuario del registro y se lo pasamos al token y este retornara el usuario con su token que expira en 1 hora
    const token = generateToken(user);
    //ahora definimos la respuesta
    resp.status(201).json({ token });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ error: "HUbo un error en el registro" });
  }
};
