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
const book_model_1 = require("./book.model");
// DECLARE ACTION FUNCTION
function readBookAction() {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield book_model_1.BookModel.find({ state: true });
        return results;
    });
}
function readBookbyIDAction(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield book_model_1.BookModel.findOne({ _id: id, state: true }).lean();
        return result;
    });
}
function readBooksbyFiltersAction(filters) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield book_model_1.BookModel.find(filters);
    });
}
// EXPORT ACTION FUNCTION
exports.default = { readBookAction, readBookbyIDAction, readBooksbyFiltersAction };
