// book.routes.ts
import { Router, Request, Response, NextFunction } from 'express';
import {
    createBookController,
    updateBookController,
    deleteBookController,
    getBookController,
    getBooksController,
    reserveBookController
} from '../controllers/book.controller';
import {
    createBookPermissionMiddleware,
    updateBookPermissionMiddleware,
    deleteBookPermissionMiddleware
} from '../middlewares/permissionMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';
import { AuthRequest } from '../custom';

const router = Router();

// Funciones de endpoint
async function CreateBook(req: AuthRequest, res: Response) {
    try {
        const book = await createBookController(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create book', error });
    }
}

async function UpdateBook(req: AuthRequest, res: Response) {
    try {
        const { bookId } = req.params;
        const book = await updateBookController(bookId, req.body);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update book', error });
    }
}

async function DeleteBook(req: AuthRequest, res: Response) {
    try {
        const { bookId } = req.params;
        const book = await deleteBookController(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete book', error });
    }
}

async function GetBook(req: Request, res: Response, next: NextFunction) {
    try {
        const { bookId } = req.params;
        const book = await getBookController(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
}

async function GetBooks(req: Request, res: Response, next: NextFunction) {
    try {
        const filters: any = { isActive: true };

        if (req.query.genre) filters.genre = req.query.genre;
        if (req.query.publishedDate) filters.publishedDate = new Date(req.query.publishedDate as string);
        if (req.query.publisher) filters.publisher = req.query.publisher;
        if (req.query.author) filters.author = req.query.author;
        if (req.query.title) filters.title = { $regex: req.query.title, $options: 'i' };
        if (req.query.isAvailable !== undefined) filters.isAvailable = req.query.isAvailable === 'true';

        const books = await getBooksController(filters);
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
}

async function ReserveBook(req: AuthRequest, res: Response) {
    try {
        const { bookId } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is missing' });
        }

        const book = await reserveBookController(bookId, userId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found or already reserved' });
        }

        res.status(200).json({ message: 'Book reserved successfully', book });
    } catch (error) {
        res.status(500).json({ message: 'Failed to reserve book', error });
    }
}

// Declaración de endpoints
router.post('/create', authMiddleware, createBookPermissionMiddleware, CreateBook);
router.put('/update/:bookId', authMiddleware, updateBookPermissionMiddleware, UpdateBook);
router.delete('/delete/:bookId', authMiddleware, deleteBookPermissionMiddleware, DeleteBook);
router.get('/:bookId', GetBook);
router.get('/', GetBooks);
router.post('/reserve/:bookId', authMiddleware, ReserveBook);

// Exportar rutas
export default router;
