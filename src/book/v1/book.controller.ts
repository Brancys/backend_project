import createBookAction from "./create.book.action";
import bookActions from "./read.book.action";
import { BookType } from "./book.model";
import { CreateBookType } from "./book.types";

export interface BookFilters {
  name?: string | { $regex: RegExp };
  author?: string;
  releaseDate?: string;
  price?: string;
  description?: string;
  gender?: string;
  editorial?: string;
  available?: boolean;
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
    const books = await bookActions.readBooksbyFiltersAction(filters);
    return { success: true, data: books };
  } catch (error) {
    return { success: false, error };
  }
}

// EXPORT CONTROLLER FUNCTIONS
export { readBooks, readBookbyID, createBook, readBooksbyFilters };
