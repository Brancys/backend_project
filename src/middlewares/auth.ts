import jwt    from "jsonwebtoken";
import { JwtPayload } from 'jsonwebtoken';
import  isAdmin  from "../user/v1/user.routes";
import { Request, Response, NextFunction } from "express";

// Extending the Request interface to include the user property

const SECRET_KEY = process.env.JWT_SECRET; // Reemplaza 'your_secret_key' por tu clave secreta

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload | string; // Agrega la propiedad `user` al tipo `Request`
  }
}

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

// Middleware para proteger rutas con autenticación
export function authMiddleware(requireSelfOrAdmin: boolean = false) {
  return (request: Request, response: Response, next: NextFunction) => {
      const authHeader = request.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
          return response.status(401).json({ message: 'Access denied. No token provided.' });
      }

      try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

          // Agregar el usuario decodificado a la solicitud
          request.user = decoded;

          // Si `requireSelfOrAdmin` es verdadero, verifica si es el mismo usuario o si es admin
          if (requireSelfOrAdmin) {
              const { userId } = request.params;
              const isAdmin = decoded.role === 'admin';
              const isSelf = decoded.userId === userId;

              if (!isAdmin && !isSelf) {
                  return response.status(403).json({ message: 'Access denied. Only the user or an admin can perform this action.' });
              }
          }

          next();
      } catch (error) {
          return response.status(401).json({ message: 'Invalid token.' });
      }
  };
}