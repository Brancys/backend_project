import User, { IUser } from '../models/user.model';

export const updateUserById = async (userId: string, updates: Partial<IUser>): Promise<IUser | null> => {
  const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

export const desactivateUserById = async (userId: string): Promise<void> => {
  const user = await User.findByIdAndUpdate(userId, { isActive: false });
  if (!user) throw new Error('User not found');
};
