import { UserModel, UserType } from "./user.model";
import argon2 from 'argon2';

// DECLARE ACTION FUNCTION
async function readUserAction(): Promise<UserType[]> {
  const results = await UserModel.find();
  return results;
}

async function readUserbyIDAction(id: string): Promise<UserType | null> {
  const result = await UserModel.findOne({ _id: id }).lean();
  return result;
}

async function verifyPassword(storedPassword: string, inputPassword: string): Promise<boolean> {
  try {
      return await argon2.verify(storedPassword, inputPassword);
  } catch (error) {
      console.error("Error verifying password:", error);
      return false;
  }
} 

// EXPORT ACTION FUNCTION
export default {readUserAction, readUserbyIDAction, verifyPassword};
