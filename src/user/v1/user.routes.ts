import { Router, Request, Response } from "express";
import {
  createUser,
  readUsers,
  readUserbyID,
  verifyUserPassword,
  softDeleteUser,
  addBookToReservations,
  updateUserController,
} from "./user.controller";
import { CreateUserType } from "./user.types";
import { authMiddleware } from "../../middlewares/auth";

// INIT ROUTES
const userRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS

// Obtener todos los usuarios
async function GetUsers(request: Request, response: Response) {
  try {
    const users = await readUsers();
    response.status(200).json({
      message: "Success.",
      users: users,
    });
  } catch (error) {
    response.status(500).json({
      message: "Failure",
      error: (error as Error).message,
    });
  }
}

// Crear un nuevo usuario
async function CreateUser(
  request: Request<{}, {}, CreateUserType>,
  response: Response
) {
  if (!request.body.name) {
    return response.status(400).json({
      message: "Missing fields",
    });
  }

  try {
    const user = await createUser(request.body);
    response.status(201).json({
      message: "User created successfully.",
      user: user,
    });
  } catch (error) {
    response.status(500).json({
      message: "Failure",
      error: (error as Error).message,
    });
  }
}

// Obtener un usuario específico
async function GetOneUser(
  request: Request<{ userId: string }>,
  response: Response
) {
  const userId = request.params.userId;

  try {
    const user = await readUserbyID(userId);
    if (!user) {
      return response.status(404).json({
        message: "User not found",
      });
    }
    response.status(200).json({
      message: "Success.",
      user: user,
    });
  } catch (error) {
    response.status(500).json({
      message: "Failure",
      error: (error as Error).message,
    });
  }
}

// Verificar la contraseña de un usuario por correo electrónico
async function VerifyUserPassword(
  request: Request<{}, {}, { email: string; password: string }>,
  response: Response
) {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    const isPasswordCorrect = await verifyUserPassword(email, password);
    if (!isPasswordCorrect) {
      return response.status(401).json({
        message: "Incorrect password",
      });
    }

    response.status(200).json({
      message: "Password verified successfully",
    });
  } catch (error) {
    response.status(500).json({
      message: "Failure",
      error: (error as Error).message,
    });
  }
}

// Función para manejar el endpoint de añadir un libro a las reservas del usuario
async function handleAddBookToReservations(request: Request, response: Response) {
  const { userId } = request.params;
  const { bookId } = request.body;

  try {
      const updatedUser = await addBookToReservations(userId, bookId);
      response.status(200).json({
          message: "Book added to reservations successfully",
          user: updatedUser,
      });
  } catch (error) {
      response.status(400).json({
          message: (error as Error).message,
      });
  }
}

async function handleSoftDeleteUser(request: Request, response: Response){
  const { userId } = request.params;

  try {
      const result = await softDeleteUser(userId);
      response.status(200).json({ message: "User deleted successfully", user: result });
  } catch (error) {
      response.status(400).json({ message: (error as Error).message });
  }
};

async function handleUpdateUser(request: Request, response: Response) {
  const { userId } = request.params;
  const { name, cedula, password } = request.body;

  const updateData = {
      ...(name && { name }),
      ...(cedula && { cedula }),
      ...(password && { password })
  };

  try {
      const result = await updateUserController(userId, updateData);
      response.status(200).json({ message: "User updated successfully", user: result });
  } catch (error) {
      response.status(400).json({ message: (error as Error).message });
  }
}


// DECLARE ENDPOINTS
userRoutes.get("/", GetUsers);
userRoutes.get("/one/:userId", GetOneUser); 
userRoutes.post("/", CreateUser); 
userRoutes.get("/verify-password/", VerifyUserPassword); //authMiddleware
userRoutes.delete("/user/:userId", authMiddleware(true), handleSoftDeleteUser); //authMiddleware
userRoutes.post("/booking/:userId/reserve",authMiddleware(true), handleAddBookToReservations); //authMiddleware
userRoutes.put('/user/:userId',authMiddleware(true), handleUpdateUser); //authMiddleware

// EXPORT ROUTES
export default userRoutes;
