import { createUser } from "../actions/user-action";
import { random } from "../common";
import { UserModel } from "../models/models";
import { GROUP_JOIN_MESSAGES } from "../replies";
import { sendMessageToUser } from "../services/whatsApp";
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
      role: newUser.role,
    };
  }

  console.log("UserName: ", user.name);
  console.log("Leaving getUserData\n");
  return {
    name: user.name,
    chatId: user.recipitantId,
    newUser: false,
    role: user.role,
  };
};

export const newUserJoin = async (chatId: string, name: string) => {
  console.log("\nEntering newUserJoin");
  const user = await UserModel.findOne({ recipitantId: chatId });
  if (!user) {
    console.log(`\nUser not found with id ${chatId}, creating new user...`);
    await createUser({
      name: name,
      chatId: chatId,
      search: false,
    });
  }

  let message = GROUP_JOIN_MESSAGES[random(GROUP_JOIN_MESSAGES.length)];

  await sendMessageToUser({
    chatId,
    message: !user ? message : "Welcome back \n" + message,
  });

  console.log("Leaving newUserJoin\n");
};
