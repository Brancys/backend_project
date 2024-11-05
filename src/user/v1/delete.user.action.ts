import { UserModel, UserType } from "./user.model";

export async function softDeleteUserAction(userId: string) {
    return await UserModel.findByIdAndUpdate(userId, { state: false }, { new: true });
}

export default softDeleteUserAction;