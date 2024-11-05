import createBookAction from "./create.book.action";
import bookActions from "./read.book.action";
import { BookType } from "./book.model";
import { CreateBookType } from "./book.types";
import {softDeleteBookAction, updateBookAction} from "./delete.book.action";

export interface BookFilters {
  name?: string | { $regex: RegExp };
  author?: string;
  releaseDate?: string;
  price?: string;
  description?: string;
  gender?: string;
  editorial?: string;
  available?: boolean;
  state?: boolean;
}

// DECLARE CONTROLLER FUNCTIONS
async function readBooks(): Promise<BookType[]> {
  const Books = await bookActions.readBookAction();

  return Books;
}
async function readBookbyID(id: string): Promise<BookType | null> {
  const Books = await bookActions.readBookbyIDAction(id);
  return Books;
}
async function createBook(bookData: CreateBookType): Promise<BookType> {
  const createdBook = await createBookAction(bookData);

  return createdBook;
}

async function readBooksbyFilters(filters: BookFilters) {
  try {
    filters.state = true;
    const books = await bookActions.readBooksbyFiltersAction(filters);
    return { success: true, data: books };
  } catch (error) {
    return { success: false, error };
  }
}

async function softDeleteBook(BookId: string) {
  try {
      const book = await softDeleteBookAction(BookId);
      if (!book) {
          throw new Error("Book not found");
      }
      return { success: true, data: book };
  } catch (error) {
      return { success: false, error };
  }
}

async function updateBookController(bookId: string, updateData: Partial<{ title: string; author: string; releaseDate: string; price: string; description: string }>) {
  if (!updateData.title && !updateData.author && !updateData.releaseDate && !updateData.price && !updateData.description) {
      throw new Error("No valid fields to update");
  }

  const updatedBook = await updateBookAction(bookId, updateData);

  if (!updatedBook) {
      throw new Error("Book not found");
  }

  return updatedBook;
}

// EXPORT CONTROLLER FUNCTIONS
export { readBooks, readBookbyID, createBook, readBooksbyFilters, softDeleteBook, updateBookController };
