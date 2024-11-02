import { UserModel, UserType } from "./user.model";

// DECLARE ACTION FUNCTION
async function readUserAction(): Promise<UserType[]> {
  const results = await UserModel.find();
  return results;
}

async function readUserbyIDAction(id: string): Promise<UserType | null> {
  const result = await UserModel.findOne({ _id: id }).lean();
  return result;
}


// EXPORT ACTION FUNCTION
export default {readUserAction, readUserbyIDAction};
