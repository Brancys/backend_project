import { UserModel, UserType } from "./user.model";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken'; 

// DECLARE ACTION FUNCTION
async function readUserAction(): Promise<UserType[]> {
  const results = await UserModel.find({state: true});
  return results;
}

async function readUserbyIDAction(id: string): Promise<UserType | null> {
  const result = await UserModel.findOne({ _id: id, state: true}).lean();
  return result;
}

async function verifyUser(email: string, password: string): Promise<boolean>  {
  const user = await UserModel.findOne({ email: email, state: true });
    if (!user || !user.password) {
        throw new Error("User not found or password not set");
    }

    return await argon2.verify(user.password, password);
} 

async function loginAction(email: string, password: string) {
  const user = await UserModel.findOne({ email });
  if (!user) {
      throw new Error('Invalid email or password');
  }

  // Verificar la contraseña
  const isPasswordValid = await argon2.verify(user.password, password);
  if (!isPasswordValid) {
      throw new Error('Invalid email or password');
  }

  // Generar el token JWT
  const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role }, 
      process.env.JWT_SECRET as string, 
      { expiresIn: '1h' }
  );

  return { token, role: user.role };
}

// EXPORT ACTION FUNCTION
export default {readUserAction, readUserbyIDAction, verifyUser, loginAction};
