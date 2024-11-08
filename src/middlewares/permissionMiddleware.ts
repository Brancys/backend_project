import { Response, NextFunction } from 'express';
import { AuthRequest } from '../custom';

export const updateUserPermissionMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const userIdFromParams = req.params.userId || req.user?.id;
    const userIdFromToken = req.user?.id;

    // Permitir si el usuario tiene permiso de editar usuarios o si el usuario está modificando su propio perfil
    if (req.user?.hasPermission('edit_user') || userIdFromToken === userIdFromParams) {
        return next();
    }

    return res.status(403).json({ message: 'Access denied' });
};

export const deleteUserPermissionMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const userIdFromParams = req.params.userId || req.user?.id;
    const userIdFromToken = req.user?.id;

    // Permitir si el usuario tiene permiso de eliminar usuarios o si el usuario está eliminando su propio perfil
    if (req.user?.hasPermission('delete_user') || userIdFromToken === userIdFromParams) {
        return next();
    }

    return res.status(403).json({ message: 'Access denied' });
};

export const updateBookPermissionMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {

    // Permitir si el usuario tiene permiso de editar libros
    if (req.user?.hasPermission('edit_book')) {
        return next();
    }

    return res.status(403).json({ message: 'Access denied' });
};

export const deleteBookPermissionMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {

    // Permitir si el usuario tiene permiso de eliminar libros
    if (req.user?.hasPermission('delete_book')) {
        return next();
    }

    return res.status(403).json({ message: 'Access denied' });
};

export const createBookPermissionMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {

    // Permitir si el usuario tiene permiso de crear libros
    if (req.user?.hasPermission('create_book')) {
        return next();
    }

    return res.status(403).json({ message: 'Access denied' });
};
