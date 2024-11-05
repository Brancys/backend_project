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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserReservationsAction = updateUserReservationsAction;
const user_model_1 = require("./user.model");
const book_model_1 = require("../../book/v1/book.model"); // Asegúrate de importar el modelo de libro
const mongoose_1 = __importDefault(require("mongoose"));
function updateUserReservationsAction(userId, bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Verificar si el libro está disponible
        const book = yield book_model_1.BookModel.findById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        if (!book.available) {
            throw new Error("Book is already reserved and unavailable for booking.");
        }
        // Actualizar el estado del libro a `available: false`
        yield book_model_1.BookModel.findByIdAndUpdate(bookId, { available: false }, { new: true });
        // Añadir el libro a las reservas del usuario
        return yield user_model_1.UserModel.findByIdAndUpdate(userId, { $addToSet: { bookings: new mongoose_1.default.Types.ObjectId(bookId) } }, { new: true }).populate('bookings'); // Poblar los detalles completos de los libros reservados
    });
}
