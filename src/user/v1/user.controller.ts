import createUserAction from "./create.user.action";
import UserActions from "./read.user.action";
import { UserType } from "./user.model";
import { CreateUserType } from "./user.types";

// DECLARE CONTROLLER FUNCTIONS
async function readUsers(): Promise<UserType[]> {
  const Users = await UserActions.readUserAction();

  return Users;
}
async function readUserbyID(id: string): Promise<UserType | null> {
  const Users = await UserActions.readUserbyIDAction(id);
  return Users;
}
async function createUser(UserData: CreateUserType): Promise<UserType> {
  const createdUser = await createUserAction(UserData);

  return createdUser;
}

// EXPORT CONTROLLER FUNCTIONS
export { readUsers, readUserbyID, createUser };
