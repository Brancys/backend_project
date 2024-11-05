"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./db"));
const app = (0, app_1.default)();
(0, db_1.default)();
// START SERVER
app.listen(3000, () => {
    console.log("Server listening to port 3000.");
});
