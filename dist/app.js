"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createApp;
const user_routes_1 = __importDefault(require("./user/v1/user.routes"));
const book_routes_1 = __importDefault(require("./book/v1/book.routes"));
const auth_routes_1 = __importDefault(require("./middlewares/auth.routes"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// ROUTES
const SERVER_VERSION = "/api/v1/";
// FALLBACKS
function routeNotFound(request, response) {
    response.status(404).json({
        message: "Route not found.",
    });
}
function createApp() {
    // MIDDLEWARES
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(SERVER_VERSION + "users", user_routes_1.default);
    app.use(SERVER_VERSION + "books", book_routes_1.default);
    app.use(SERVER_VERSION + "auth", auth_routes_1.default);
    app.use(routeNotFound);
    return app;
}
