//se debe poner una palabra secreta para que use esa palabra secreta para poder ver que el token sea real
import prisma from "../models/user";
import jwt from "jsonwebtoken";
import { User } from "../interfaces/user.interface";
import { TokenPayloadForClient } from "../interfaces/express";
import { hashPassword } from "../services/password.service";
import { handlePrismaError } from "../utils/errors/PrismaError";

//con una palabra secreta + el email + el password se generará el jwt para poder loguear
const JWT_SECRET = process.env.JWT_SECRET || "Default-secret";

export const createUser = async (email: string, password: string) => {
  try {
    const hashedPassword = await hashPassword(password);

    console.log(hashedPassword);

    const user = await prisma.create({
      data: {
        email,
        password: hashedPassword,
        role: "user",
      },
    });
    return user;
  } catch (error) {
    handlePrismaError(error);
  }
};

export const generateTokenForRegister = (user: User) => {
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
) => {
  return jwt.sign(payloadForClient, JWT_SECRET, { expiresIn: "1h" });
};

export const findUserByEmail = async (email: string) => {
  return prisma.findUnique({ where: { email } });
};
