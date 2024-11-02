import { Router, Request, Response } from "express";
import { createUser, readUsers, readUserbyID, verifyUserPassword } from "./user.controller";
import { CreateUserType } from "./user.types";
import { AuthMiddleware } from "../../middleware/auth";
import { UserType } from "./user.model";

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
async function CreateUser(request: Request<{}, {}, CreateUserType>, response: Response) {
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
async function GetOneUser(request: Request<{ userId: string }>, response: Response) {
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
async function VerifyUserPassword(request: Request<{}, {}, { email: string; password: string }>, response: Response) {
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


// DECLARE ENDPOINTS
userRoutes.get("/", GetUsers);
userRoutes.get("/one/:userId", GetOneUser); //AuthMiddleware
userRoutes.post("/", CreateUser);
userRoutes.get("/verify-password/", VerifyUserPassword);


// EXPORT ROUTES
export default userRoutes;