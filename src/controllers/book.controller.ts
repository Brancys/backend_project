// book.controller.ts
import {
    createBookAction,
    updateBookAction,
    deleteBookAction,
    getBookAction,
    getBooksAction,
    reserveBookAction
} from '../services/book.action';

export const createBookController = async (bookData: object) => {
    return await createBookAction(bookData);
};

export const updateBookController = async (bookId: string, updates: object) => {
    return await updateBookAction(bookId, updates);
};

export const deleteBookController = async (bookId: string) => {
    return await deleteBookAction(bookId);
};

export const getBookController = async (bookId: string) => {
    return await getBookAction(bookId);
};

export const getBooksController = async (filters: any) => {
    return await getBooksAction(filters);
};

export const reserveBookController = async (bookId: string, userId: string) => {
    return await reserveBookAction(bookId, userId);
};
