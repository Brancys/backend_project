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
exports.addBookToReservations = addBookToReservations;
exports.readUsers = readUsers;
exports.readUserbyID = readUserbyID;
exports.createUser = createUser;
exports.verifyUserPassword = verifyUserPassword;
exports.softDeleteUser = softDeleteUser;
const create_user_action_1 = __importDefault(require("./create.user.action"));
const read_user_action_1 = __importDefault(require("./read.user.action"));
const delete_user_action_1 = __importDefault(require("./delete.user.action"));
const update_user_action_1 = require("./update.user.action");
// DECLARE CONTROLLER FUNCTIONS
function readUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const Users = yield read_user_action_1.default.readUserAction();
        return Users;
    });
}
function readUserbyID(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const Users = yield read_user_action_1.default.readUserbyIDAction(id);
        return Users;
    });
}
function createUser(UserData) {
    return __awaiter(this, void 0, void 0, function* () {
        const createdUser = yield (0, create_user_action_1.default)(UserData);
        return createdUser;
    });
}
function verifyUserPassword(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const createdUser = yield read_user_action_1.default.verifyUser(email, password);
        return createdUser;
    });
}
function addBookToReservations(userId, bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!bookId) {
            throw new Error("Book ID is required");
        }
        // Llamar a la acción para realizar la reserva
        const updatedUser = yield (0, update_user_action_1.updateUserReservationsAction)(userId, bookId);
        if (!updatedUser) {
            throw new Error("User not found");
        }
        return updatedUser;
    });
}
function softDeleteUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, delete_user_action_1.default)(userId);
            if (!user) {
                throw new Error("User not found");
            }
            return { success: true, data: user };
        }
        catch (error) {
            return { success: false, error };
        }
    });
}
