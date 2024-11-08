// auth.action.ts
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

export const registerUserAction = async (userData: Partial<IUser>) => {
  const user = new User(userData);
  await user.save();
  return user;
};

export const loginUserAction = async (email: string, password: string) => {
  const user = await User.findOne({ email, isActive: true });
  if (!user) throw new Error('User not found or inactive');

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return { user, token };
};

export const verifyTokenAction = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    throw new Error('Invalid token');
  }
};
