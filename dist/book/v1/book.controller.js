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
exports.readBooks = readBooks;
exports.readBookbyID = readBookbyID;
exports.createBook = createBook;
exports.readBooksbyFilters = readBooksbyFilters;
exports.softDeleteBook = softDeleteBook;
const create_book_action_1 = __importDefault(require("./create.book.action"));
const read_book_action_1 = __importDefault(require("./read.book.action"));
const delete_book_action_1 = __importDefault(require("./delete.book.action"));
// DECLARE CONTROLLER FUNCTIONS
function readBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        const Books = yield read_book_action_1.default.readBookAction();
        return Books;
    });
}
function readBookbyID(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const Books = yield read_book_action_1.default.readBookbyIDAction(id);
        return Books;
    });
}
function createBook(bookData) {
    return __awaiter(this, void 0, void 0, function* () {
        const createdBook = yield (0, create_book_action_1.default)(bookData);
        return createdBook;
    });
}
function readBooksbyFilters(filters) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            filters.state = true;
            const books = yield read_book_action_1.default.readBooksbyFiltersAction(filters);
            return { success: true, data: books };
        }
        catch (error) {
            return { success: false, error };
        }
    });
}
function softDeleteBook(BookId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = yield (0, delete_book_action_1.default)(BookId);
            if (!book) {
                throw new Error("Book not found");
            }
            return { success: true, data: book };
        }
        catch (error) {
            return { success: false, error };
        }
    });
}
