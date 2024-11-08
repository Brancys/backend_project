import Book, { IBook } from '../models/book.model';

export const createBookAction = async (bookData: Partial<IBook>): Promise<IBook> => {
    const book = new Book(bookData);
    await book.save();
    return book;
};

export const updateBookAction = async (bookId: string, updates: Partial<IBook>): Promise<IBook | null> => {
    const book = await Book.findByIdAndUpdate(bookId, updates, { new: true });
    return book;
};

export const deleteBookAction = async (bookId: string): Promise<IBook | null> => {
    const book = await Book.findByIdAndUpdate(bookId, { isActive: false }, { new: true });
    return book;
};

export const getBookAction = async (bookId: string): Promise<IBook | null> => {
    const book = await Book.findOne({ _id: bookId, isActive: true });
    return book;
};

export const getBooksAction = async (filters: any): Promise<IBook[]> => {
    const books = await Book.find(filters);
    return books;
};

export const reserveBookAction = async (bookId: string, userId: string): Promise<IBook | null> => {
    const book = await Book.findById(bookId);
    if (!book || book.isActive == false || !book.isAvailable) return null;

    book.reservedBy.push({
        userId,
        reservedDate: new Date(),
        returnDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    });
    book.isAvailable = false;
    await book.save();
    return book;
};
