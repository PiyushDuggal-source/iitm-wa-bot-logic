import { createUser } from "../actions/user-action";
import { UserModel } from "../models/models";
import { UserType } from "../types";

type UserDataProp = {
  name: string;
  chatId: string;
};

export const getUserData = async ({
  name,
  chatId,
}: UserDataProp): Promise<UserType> => {
  console.log("Entering getUserData");
  const user = await UserModel.findOne({ recipitantId: chatId });
  if (!user) {
    console.log(`\nUser not found with id ${chatId}`);
    const newUser = await createUser({
      name: name,
      chatId: chatId,
      search: false,
    });
    return {
      name: newUser.name,
      chatId: newUser.recipitantId,
      newUser: true,
    };
  }

  console.log("Leaving getUserData\n");
  return {
    name: user.name,
    chatId: user.recipitantId,
    newUser: false,
  };
};
