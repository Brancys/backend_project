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
const user_controller_1 = require("./user.controller");
// INIT ROUTES
const userRoutes = (0, express_1.Router)();
// DECLARE ENDPOINT FUNCTIONS
// Obtener todos los usuarios
function GetUsers(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, user_controller_1.readUsers)();
            response.status(200).json({
                message: "Success.",
                users: users,
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
function CreateUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!request.body.name) {
            return response.status(400).json({
                message: "Missing fields",
            });
        }
        try {
            const user = yield (0, user_controller_1.createUser)(request.body);
            response.status(201).json({
                message: "User created successfully.",
                user: user,
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
// Obtener un usuario específico
function GetOneUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = request.params.userId;
        try {
            const user = yield (0, user_controller_1.readUserbyID)(userId);
            if (!user) {
                return response.status(404).json({
                    message: "User not found",
                });
            }
            response.status(200).json({
                message: "Success.",
                user: user,
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
// Verificar la contraseña de un usuario por correo electrónico
function VerifyUserPassword(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).json({
                message: "Email and password are required",
            });
        }
        try {
            const isPasswordCorrect = yield (0, user_controller_1.verifyUserPassword)(email, password);
            if (!isPasswordCorrect) {
                return response.status(401).json({
                    message: "Incorrect password",
                });
            }
            response.status(200).json({
                message: "Password verified successfully",
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
function handleSoftDeleteUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = request.params;
        const result = yield (0, user_controller_1.softDeleteUser)(userId);
        if (result.success) {
            response.status(200).json({
                message: "User soft deleted successfully",
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
function isAdmin(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = request.params;
        let user = yield (0, user_controller_1.readUserbyID)(userId);
        if (!user) {
            throw new Error("User not found");
        }
        else if (user.role !== "admin") {
            return false;
        }
        return true;
    });
}
// Función para manejar el endpoint de añadir un libro a las reservas del usuario
function handleAddBookToReservations(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = request.params;
        const { bookId } = request.body;
        try {
            const updatedUser = yield (0, user_controller_1.addBookToReservations)(userId, bookId);
            response.status(200).json({
                message: "Book added to reservations successfully",
                user: updatedUser,
            });
        }
        catch (error) {
            response.status(400).json({
                message: error.message,
            });
        }
    });
}
// DECLARE ENDPOINTS
userRoutes.get("/", GetUsers);
userRoutes.get("/one/:userId", GetOneUser);
userRoutes.post("/", CreateUser);
userRoutes.get("/verify-password/", VerifyUserPassword);
userRoutes.delete("/user/:userId", handleSoftDeleteUser);
userRoutes.post("/booking/:userId", handleAddBookToReservations); //authMiddleware
// EXPORT ROUTES
exports.default = userRoutes;
