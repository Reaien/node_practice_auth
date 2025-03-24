import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma.user;

//acá tenemos el modelo de prisma del usuario
