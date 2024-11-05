import { Router, Request, Response } from 'express';
import { generateToken } from './auth'; // Importa la función para generar el token
import { loginController } from '../user/v1/user.controller';

const authRoutes = Router();

authRoutes.post('/login', loginController);


authRoutes.post('/generate-token', (request: Request, response: Response) => {
    const { userId, email, role } = request.body;

    // Verificación básica para asegurarse de que se pasan los datos necesarios
    if (!role ||!userId || !email) {
        return response.status(400).json({ message: 'userId and email are required' });
    }

    // Generar el token usando el payload de prueba
    const token = generateToken({ userId, email, role });

    // Devolver el token en la respuesta
    response.status(200).json({
        message: 'Token generated successfully',
        token,
    });
});

export default authRoutes;