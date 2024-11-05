"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("./auth"); // Importa la función para generar el token
const authRoutes = (0, express_1.Router)();
authRoutes.post('/generate-token', (request, response) => {
    const { userId, email, role } = request.body;
    // Verificación básica para asegurarse de que se pasan los datos necesarios
    if (!role || !userId || !email) {
        return response.status(400).json({ message: 'userId and email are required' });
    }
    // Generar el token usando el payload de prueba
    const token = (0, auth_1.generateToken)({ userId, email, role });
    // Devolver el token en la respuesta
    response.status(200).json({
        message: 'Token generated successfully',
        token,
    });
});
exports.default = authRoutes;
