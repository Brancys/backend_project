"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handleMongoConnection;
const mongoose_1 = __importDefault(require("mongoose"));
function handleMongoConnection() {
    const uri = process.env.MONGO_CONN_STRING;
    if (!uri) {
        throw new Error("La cadena de conexión MONGO_CONN_STRING no está definida en las variables de entorno.");
    }
    const dbName = uri.split('/').pop();
    mongoose_1.default
        .connect(uri)
        .then(() => {
        console.log(`Conectado a base de datos: '${dbName}' en MongoDB Atlas`);
    })
        .catch((error) => {
        console.error("Error al conectar con MongoDB Atlas:", error);
    });
}
