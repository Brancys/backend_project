import { UserType } from "./user.model";

export type CreateUserType = Omit<UserType, "_id">
export type UpdateUserType = Omit<Partial<UserType>, "_id">