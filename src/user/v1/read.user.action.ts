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

async function verifyUser(email: string, password: string): Promise<boolean>  {
  const user = await UserModel.findOne({ email });
    if (!user || !user.password) {
        throw new Error("User not found or password not set");
    }

    return await argon2.verify(user.password, password);
} 

// EXPORT ACTION FUNCTION
export default {readUserAction, readUserbyIDAction, verifyUser};
