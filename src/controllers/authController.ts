import { Request, Response } from "express";
import { comparePasswords, hashPassword } from "../services/password.service";
import prisma from "../models/user";
import {
  generateTokenForClient,
  generateTokenForRegister,
} from "../services/auth.service";
import { error } from "console";

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
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);

    const user = await prisma.create({
      data: {
        email,
        password: hashedPassword,
        role: "user",
      },
    });
    console.log(user);

    //token para autenticar al registrar y así dejar logueado
    //pasamos el usuario del registro y se lo pasamos al token y este retornara el usuario con su token que expira en 1 hora
    const token = generateTokenForRegister(user);
    //ahora definimos la respuesta
    resp.status(201).json({ token });
  } catch (error: any) {
    if (error?.code === "P2002" && error?.meta?.target?.includes("email")) {
      resp
        .status(400)
        .json({ message: "el email ingresado ya se encuentra en uso" });
      return;
    }

    console.log(error);
  }
};

export const login = async (req: Request, resp: Response): Promise<void> => {
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
    const user = await prisma.findUnique({ where: { email } });

    if (!user) {
      resp.status(400).json({ error: "Usuario incorrecto" });
      return;
    }
    //comparador de contraseñas
    const passwordMatch = await comparePasswords(password, user.password);
    if (!passwordMatch) {
      resp.status(401).json({ error: "usuario y contraseña no coinciden" });
      return;
    }

    const clientTokenPayload = {
      email: user.email,
      role: user.role,
    };

    const token = generateTokenForClient(clientTokenPayload);
    resp.status(200).json({ token });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ error: "Hubo un error en el registro" });
    return;
  }
};
