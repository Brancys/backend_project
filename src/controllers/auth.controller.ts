// auth.controller.ts
import { registerUserAction, loginUserAction } from '../services/auth.action';

export const registerController = async (userData: { name: string; email: string; password: string }) => {
  const user = await registerUserAction(userData);
  return user;
};

export const loginController = async (email: string, password: string) => {
  const { user, token } = await loginUserAction(email, password);
  return { user, token };
};
