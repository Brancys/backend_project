import { Router, Request, Response } from "express";
import {
  createBook,
  readBooks,
  readBookbyID,
  readBooksbyFilters,
  BookFilters,
  softDeleteBook,
  updateBookController,
} from "./book.controller";
import { CreateBookType } from "./book.types";
import { authMiddleware, onlyAdminMiddleware } from "../../middlewares/auth";

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
async function CreateBooks(
  request: Request<{}, {}, CreateBookType>,
  response: Response
) {
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

async function handleSoftDeleteBook(request: Request, response: Response) {
  const { bookId } = request.params;

  const result = await softDeleteBook(bookId);

  if (result.success) {
    response.status(200).json({
      message: "Book soft deleted successfully",
      user: result.data,
    });
  } else {
    response.status(500).json({
      message: "Failure",
      error: (result.error as Error).message,
    });
  }
}

// Obtener un libro específico
async function GetOneBook(
  request: Request<{ bookId: string }>,
  response: Response
) {
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

// Función para manejar el filtrado de libros
async function handleReadBooks(request: Request, response: Response) {
  const {
    name,
    author,
    releaseDate,
    price,
    description,
    gender,
    editorial,
    available,
  } = request.query;

  // Construir el objeto de filtros a partir de los query params
  let filters: Partial<BookFilters> = {
    name: name ? { $regex: new RegExp(name as string, "i") } : undefined,
    author: author as string,
    releaseDate: releaseDate as string,
    price: price as string,
    description: description as string,
    gender: gender as string,
    editorial: editorial as string,
    available: available !== undefined ? available === "true" : undefined,
  };

  // Esto ya que el mongoose tiene problemas para manejar los campos `undefined`, por lo que se eliminan
  filters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== undefined)
  ) as Partial<BookFilters>;

  // Llamar al controlador con los filtros procesados
  const result = await readBooksbyFilters(filters);

  // Manejo de la respuesta según el resultado
  if (result.success) {
    response.status(200).json({
      message: "Books fetched successfully",
      books: result.data,
    });
  } else {
    response.status(500).json({
      message: "Failure",
      error: (result.error as Error).message,
    });
  }
}

async function handleUpdateBook(request: Request, response: Response) {
  const { bookId } = request.params;
  const { title, author, releaseDate, price, description } = request.body;

  // Crear un objeto con solo los datos que queremos actualizar
  const updateData: Partial<{ title: string; author: string; releaseDate: string; price: string; description: string }> = {
      ...(title && { title }),
      ...(author && { author }),
      ...(releaseDate && { releaseDate }),
      ...(price && { price }),
      ...(description && { description })
  };

  try {
      const result = await updateBookController(bookId, updateData);
      response.status(200).json({ message: "Book updated successfully", book: result });
  } catch (error) {
      response.status(400).json({ message: (error as Error).message });
  }
};



// DECLARE ENDPOINTS
BookRoutes.get("/", GetBooks);
BookRoutes.get("/one/:bookId", GetOneBook); //AuthMiddleware
BookRoutes.post("/",onlyAdminMiddleware(true), CreateBooks);
BookRoutes.get("/filter", handleReadBooks);
BookRoutes.delete("/delete/:bookId", onlyAdminMiddleware(true), handleSoftDeleteBook);
BookRoutes.put('/book/:bookId', onlyAdminMiddleware(true), handleUpdateBook);

// EXPORT ROUTES
export default BookRoutes;
