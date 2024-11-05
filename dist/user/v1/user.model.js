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
exports.UserSchema = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const argon2_1 = __importDefault(require("argon2"));
// DECLARE MONGOOSE SCHEMA
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
        editable: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'El email no es válido'],
        editable: false
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
        maxlength: [15, 'La contraseña no puede tener más de 15 caracteres'],
    },
    state: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    bookings: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Book' }] // Asegúrate de tener `ref: 'Book'`
}, {
    timestamps: true,
    versionKey: false,
});
exports.UserSchema = UserSchema;
// Middleware para hashear la contraseña antes de guardarla
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        try {
            user.password = yield argon2_1.default.hash(user.password);
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
// DECLARE MONGO MODEL
const UserModel = (0, mongoose_1.model)("User", UserSchema);
exports.UserModel = UserModel;
