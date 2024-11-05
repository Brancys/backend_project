import createUserAction from "./create.user.action";
import UserActions from "./read.user.action";
import softDeleteUserAction from "./delete.user.action";
import { UserType } from "./user.model";
import { CreateUserType } from "./user.types";
import { updateUserReservationsAction, updateUserAction } from './update.user.action';
import e from "express";

// DECLARE CONTROLLER FUNCTIONS
async function readUsers(): Promise<UserType[]> {
  const Users = await UserActions.readUserAction();

  return Users;
}

async function readUserbyID(id: string): Promise<UserType | null> {
  const Users = await UserActions.readUserbyIDAction(id);
  return Users;
}

async function createUser(UserData: CreateUserType): Promise<UserType> {
  const createdUser = await createUserAction(UserData);

  return createdUser;
}

async function verifyUserPassword(
  email: string,
  password: string
): Promise<boolean> {
  const createdUser = await UserActions.verifyUser(email, password);

  return createdUser;
}

export async function loginController(request: e.Request, response: e.Response) {
  const { email, password } = request.body;

  try {
      const { token, role } = await UserActions.loginAction(email, password);
      response.status(200).json({ message: 'Login successful', token, role });
  } catch (error) {
      response.status(400).json({ message: (error as Error).message });
  }
}

export async function addBookToReservations(userId: string, bookId: string) {
  if (!bookId) {
      throw new Error("Book ID is required");
  }

  // Llamar a la acción para realizar la reserva
  const updatedUser = await updateUserReservationsAction(userId, bookId);
  if (!updatedUser) {
      throw new Error("User not found");
  }

  return updatedUser;
}

async function softDeleteUser(userId: string) {
  const deletedUser = await softDeleteUserAction(userId);

  if (!deletedUser) {
      throw new Error("User not found");
  }

  return deletedUser;
}

async function updateUserController(userId: string, updateData: Partial<{ name: string; cedula: string; password: string }>) {
  if (!updateData.name && !updateData.cedula && !updateData.password) {
      throw new Error("No valid fields to update");
  }

  const updatedUser = await updateUserAction(userId, updateData);

  if (!updatedUser) {
      throw new Error("User not found");
  }

  return updatedUser;
}

// EXPORT CONTROLLER FUNCTIONS
export {
  readUsers,
  readUserbyID,
  createUser,
  verifyUserPassword,
  softDeleteUser,
  updateUserController,
  };
