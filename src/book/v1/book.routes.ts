import { Router, Request, Response } from "express";
import { createBook, readBooks, readBookbyID } from "./book.controller";
import { CreateBookType } from "./book.types";
import { AuthMiddleware } from "../../middleware/auth";
import { BookType } from "./book.model";

// INIT ROUTES
const BookRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS

// Obtener todos los usuarios
async function GetBooks(request: Request, response: Response) {
  try {
    const Books = await readBooks();
    response.status(200).json({
      message: "Success.",
      Books: Books,
    });
  } catch (error) {
    response.status(500).json({
      message: "Failure",
      error: (error as Error).message,
    });
  }
}

// Crear un nuevo usuario
async function CreateBooks(request: Request<{}, {}, CreateBookType>, response: Response) {
  if (!request.body.name) {
    return response.status(400).json({
      message: "Missing fields",
    });
  }

  try {
    const Book = await createBook(request.body);
    response.status(201).json({
      message: "Book created successfully.",
      Book: Book,
    });
  } catch (error) {
    response.status(500).json({
      message: "Failure",
      error: (error as Error).message,
    });
  }
}

// Obtener un usuario específico
async function GetOneBook(request: Request<{ bookId: string }>, response: Response) {
  const BookId = request.params.bookId;

  try {
    const Book = await readBookbyID(BookId);

    if (!Book) {
      return response.status(404).json({
        message: "Book not found",
      });
    }
    response.status(200).json({
      message: "Success.",
      Book: Book,
    });
  } catch (error) {
    response.status(500).json({
      message: "Failure",
      error: (error as Error).message,
    });
  }
}

// DECLARE ENDPOINTS
BookRoutes.get("/", GetBooks);
BookRoutes.get("/one/:bookId", GetOneBook); //AuthMiddleware
BookRoutes.post("/", CreateBooks);

// EXPORT ROUTES
export default BookRoutes;
