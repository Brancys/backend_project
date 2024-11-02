import { UserModel, UserType } from "./user.model";
import { CreateUserType } from "./user.types";

// DECLARE ACTION FUNCTION
async function createUserAction(userData: CreateUserType): Promise<UserType> {
  const results = await UserModel.create(userData);

  return results;
}

// EXPORT ACTION FUNCTION
export default createUserAction;
