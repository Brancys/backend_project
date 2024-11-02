import { model, Schema, CallbackError } from "mongoose";
import argon2 from 'argon2';    

// DECLARE MODEL TYPE
type UserType = {
    _id: string;
    name: string;
    cedula: string;
    email: string;
    password: string;
    state: boolean;
};

// DECLARE MONGOOSE SCHEMA
const UserSchema = new Schema<UserType>({
    name: {
        type: String,
        required: true
    },
    cedula: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'El email no es válido'],
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
        maxlength: [15, 'La contraseña no puede tener más de 15 caracteres'],
    },
    state: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true,
    versionKey: false,
});

// Middleware para hashear la contraseña antes de guardarla
UserSchema.pre('save', async function (next) {
    const user = this as UserType;

    try {
        user.password = await argon2.hash(user.password);
        next();
    } catch (error) {
        next(error as CallbackError);
    }
});

// DECLARE MONGO MODEL
const UserModel = model<UserType>("User", UserSchema);

// EXPORT ALL
export { UserModel, UserSchema, UserType };
