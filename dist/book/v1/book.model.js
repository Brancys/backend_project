"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookSchema = exports.BookModel = void 0;
const mongoose_1 = require("mongoose");
// DECLARE MONGOOSE SCHEMA
const BookSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false,
        default: "Anónimo"
    },
    releaseDate: {
        type: String,
        required: false,
        default: "No hay registro."
    },
    price: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false,
        default: "No hay descripción."
    },
    gender: {
        type: String,
        required: false
    },
    editorial: {
        type: String,
        required: false
    },
    available: {
        type: Boolean,
        required: false,
        default: true
    },
    state: {
        type: Boolean,
        required: false,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false,
});
exports.BookSchema = BookSchema;
// DECLARE MONGO MODEL
const BookModel = (0, mongoose_1.model)("Book", BookSchema);
exports.BookModel = BookModel;
