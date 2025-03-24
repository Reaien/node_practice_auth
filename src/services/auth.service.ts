//se debe poner una palabra secreta para que use esa palabra secreta para poder ver que el token sea real

import jwt from "jsonwebtoken";
import { User } from "../models/user.interface";

//con una palabra secreta + el email + el password se generará el jwt para poder loguear
const JWT_SECRET = process.env.JWT_SECRET || "Default-secret";

export const generateToken = (user: User): string => {
  return jwt.sign(
    { id: user.id, email: user.email, password: user.password },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};
