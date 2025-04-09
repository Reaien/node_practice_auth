import { JwtPayload } from "jsonwebtoken";

// Define la estructura esperada de tu payload JWT
export interface UserPayload extends JwtPayload {
  id: number; // o el tipo de ID que uses (number, etc.)
  email: string;
  password: string;
  role: string;
  iat: number;
  exp: number;
  // añade otros campos que incluyas en tu token
}

//tipo para crear un payload que recibirá el cliente que no tiene info sensible
export interface TokenPayloadForClient extends JwtPayload {
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Hacemos 'user' opcional por si el token falla
    }
  }
}
