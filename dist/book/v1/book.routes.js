"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("./book.controller");
// INIT ROUTES
const BookRoutes = (0, express_1.Router)();
// DECLARE ENDPOINT FUNCTIONS
// Obtener todos los usuarios
function GetBooks(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Books = yield (0, book_controller_1.readBooks)();
            response.status(200).json({
                message: "Success.",
                Books: Books,
            });
        }
        catch (error) {
            response.status(500).json({
                message: "Failure",
                error: error.message,
            });
        }
    });
}
// Crear un nuevo usuario
function CreateBooks(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!request.body.name) {
            return response.status(400).json({
                message: "Missing fields",
            });
        }
        try {
            const Book = yield (0, book_controller_1.createBook)(request.body);
            response.status(201).json({
                message: "Book created successfully.",
                Book: Book,
            });
        }
        catch (error) {
            response.status(500).json({
                message: "Failure",
                error: error.message,
            });
        }
    });
}
function handleSoftDeleteBook(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { bookId } = request.params;
        const result = yield (0, book_controller_1.softDeleteBook)(bookId);
        if (result.success) {
            response.status(200).json({
                message: "Book soft deleted successfully",
                user: result.data,
            });
        }
        else {
            response.status(500).json({
                message: "Failure",
                error: result.error.message,
            });
        }
    });
}
// Obtener un usuario específico
function GetOneBook(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const BookId = request.params.bookId;
        try {
            const Book = yield (0, book_controller_1.readBookbyID)(BookId);
            if (!Book) {
                return response.status(404).json({
                    message: "Book not found",
                });
            }
            response.status(200).json({
                message: "Success.",
                Book: Book,
            });
        }
        catch (error) {
            response.status(500).json({
                message: "Failure",
                error: error.message,
            });
        }
    });
}
// Función para manejar la solicitud de libros con filtros
function handleReadBooks(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, author, releaseDate, price, description, gender, editorial, available, } = request.query;
        // Construir el objeto de filtros a partir de los query params
        let filters = {
            name: name ? { $regex: new RegExp(name, "i") } : undefined,
            author: author,
            releaseDate: releaseDate,
            price: price,
            description: description,
            gender: gender,
            editorial: editorial,
            available: available !== undefined ? available === "true" : undefined,
        };
        // Esto ya que el mongoose tiene problemas para manejar los campos `undefined`, por lo que se eliminan
        filters = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== undefined));
        // Llamar al controlador con los filtros procesados
        const result = yield (0, book_controller_1.readBooksbyFilters)(filters);
        // Manejo de la respuesta según el resultado
        if (result.success) {
            response.status(200).json({
                message: "Books fetched successfully",
                books: result.data,
            });
        }
        else {
            response.status(500).json({
                message: "Failure",
                error: result.error.message,
            });
        }
    });
}
// DECLARE ENDPOINTS
BookRoutes.get("/", GetBooks);
BookRoutes.get("/one/:bookId", GetOneBook); //AuthMiddleware
BookRoutes.post("/", CreateBooks);
BookRoutes.get("/filter", handleReadBooks);
BookRoutes.delete("/book/:bookId", handleSoftDeleteBook);
// EXPORT ROUTES
exports.default = BookRoutes;
