import jwt from "jsonwebtoken";
import  isAdmin  from "../user/v1/user.routes";

const SECRET_KEY = process.env.JWT_SECRET; // Reemplaza 'your_secret_key' por tu clave secreta

// Función para generar un token JWT
export function generateToken(
  payload: { userId: string; email: string; role: string },
  expiresIn: string = "1h"
) {
  if (!SECRET_KEY) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Función para verificar un token JWT
export function verifyToken(token: string) {
  if (!SECRET_KEY) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null; // Retorna null si el token no es válido
  }
}

// Middleware para proteger rutas con autenticación
export function authMiddleware(request: any, response: any, next: any) {
  if (isAdmin) {
    next();
  }
  const token = request.headers["authorization"]; // Obtener el token del header
  if (!token) {
    return response
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return response.status(401).json({ message: "Invalid token." });
  }

  request.user = decoded; // Agrega el payload decodificado a la solicitud
  next();
}