"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET; // Reemplaza 'your_secret_key' por tu clave secreta
// Función para generar un token JWT
function generateToken(payload, expiresIn = "1h") {
    if (!SECRET_KEY) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    return jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn });
}
// Función para verificar un token JWT
function verifyToken(token) {
    if (!SECRET_KEY) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    try {
        return jsonwebtoken_1.default.verify(token, SECRET_KEY);
    }
    catch (error) {
        return null; // Retorna null si el token no es válido
    }
}
// Middleware para proteger rutas con autenticación
function authMiddleware(request, response, next) {
    // if (isAdmin) {
    //   next();
    // }
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
