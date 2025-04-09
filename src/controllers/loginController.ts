import { comparePasswords } from "../services/password.service";
import {
  findUserByEmail,
  generateTokenForClient,
} from "../services/auth.service";
import { Request, Response } from "express";

export const login = async (req: Request, resp: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      resp.status(400).json({ message: "El email es obligatorio" });
      return;
    }

    //traemos la función lógica de negocio findByEmail desde service refactorizado
    const user = await findUserByEmail(email);

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
