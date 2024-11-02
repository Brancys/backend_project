import createBookAction from "./create.book.action";
import bookActions from "./read.book.action";
import { BookType } from "./book.model";
import { CreateBookType } from "./book.types";

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

// EXPORT CONTROLLER FUNCTIONS
export { readBooks, readBookbyID, createBook };