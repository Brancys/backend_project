import { model, Schema } from "mongoose";

// DECLARE MODEL TYPE
type UserType = {
    _id: string;
    name: string;
    cedula: string;
};

// DECLARE MONGOOSE SCHEMA
const UserSchema = new Schema<UserType>({
    name: {
        type: String,
        required: true
    },
    cedula: {
        type: String
    }
},{
    timestamps: true,
    versionKey: false,
});

// DECLARE MONGO MODEL
const UserModel = model<UserType>("User", UserSchema);

// EXPORT ALL
export { UserModel, UserSchema, UserType };
