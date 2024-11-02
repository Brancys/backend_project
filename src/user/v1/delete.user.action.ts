import { UserModel, UserType } from "./user.model";

async function softDeleteUserAction(userId: string) {
    return await UserModel.findByIdAndUpdate(
        userId,
        { state: false },
        { new: true } // Devuelve el documento actualizado
    );
}

export default softDeleteUserAction;