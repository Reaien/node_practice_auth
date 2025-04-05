//se debe poner una palabra secreta para que use esa palabra secreta para poder ver que el token sea real

import jwt from "jsonwebtoken";
import { User } from "../models/user.interface";
import { TokenPayloadForClient } from "../types/express";

//con una palabra secreta + el email + el password se generará el jwt para poder loguear
const JWT_SECRET = process.env.JWT_SECRET || "Default-secret";

export const generateTokenForRegister = (user: User): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const generateTokenForClient = (
  payloadForClient: TokenPayloadForClient
): string => {
  return jwt.sign(payloadForClient, JWT_SECRET, { expiresIn: "1h" });
};
