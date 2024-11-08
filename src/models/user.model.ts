import { Schema, model, Error } from 'mongoose';
import argon2 from 'argon2';

export interface IUser {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  permissions: {
    edit_user: boolean;
    delete_user: boolean;
    create_book: boolean;
    edit_book: boolean;
    delete_book: boolean;
  };
  reservations?: Array<{
    bookId: Schema.Types.ObjectId;
    reservedAt: Date;
    returnedAt?: Date;
  }>;
  comparePassword(candidatePassword: string): Promise<boolean>;
  hasPermission(permission: keyof IUser['permissions']): boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    permissions: {
      type: {
        edit_user: { type: Boolean, default: false },
        delete_user: { type: Boolean, default: false },
        create_book: { type: Boolean, default: false },
        edit_book: { type: Boolean, default: false },
        delete_book: { type: Boolean, default: false },
      },
      default: {},
    },
    reservations: [
      {
        bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
        reservedAt: { type: Date, default: Date.now },
        returnedAt: { type: Date },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Middleware para hashear la contraseña antes de guardar
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    user.password = await argon2.hash(user.password);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    return await argon2.verify(this.password, candidatePassword);
  } catch (error) {
    return false;
  }
};

// Método para verificar permisos individuales
userSchema.methods.hasPermission = function (permission: keyof IUser['permissions']): boolean {
  return this.permissions[permission] || false;
};

const User = model<IUser>('User', userSchema);
export default User;
