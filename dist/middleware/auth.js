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
exports.AuthMiddleware = AuthMiddleware;
const jsonwebtoken_1 = require("jsonwebtoken");
function AuthMiddleware(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (request.headers.authorization === undefined) {
            return response.status(401).json({
                message: "Not authorized."
            });
        }
        const jwtValues = (0, jsonwebtoken_1.decode)(request.headers.authorization);
        // hago busqueda de usuario usando id de JWT Values
        request.body.user = jwtValues;
        next();
    });
}
