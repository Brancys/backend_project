import createUserAction from "./create.user.action";
import UserActions from "./read.user.action";
import softDeleteUserAction from "./delete.user.action";
import { UserType } from "./user.model";
import { CreateUserType } from "./user.types";
import { updateUserReservationsAction } from './update.user.action';
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
  try {
    const user = await softDeleteUserAction(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error };
  }
}


// EXPORT CONTROLLER FUNCTIONS
export {
  readUsers,
  readUserbyID,
  createUser,
  verifyUserPassword,
  softDeleteUser,
};
