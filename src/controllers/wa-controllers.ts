import { sendMessageToBot, sendMessageToUser } from "../services/whatsApp";
import { Req_type } from "../types";
import { createCmdResponse } from "./cmd-controller";
import { getUserData } from "./user-controllers";

export const processMessageSend = async (
  messageObject: Req_type,
  commandRes: string,
) => {
  console.log("\nEntering processMessageSend");
  const { name, chatId, cmd } = messageObject;
  const userInfo = await getUserData({
    name,
    chatId,
  });

  if (userInfo.newUser) {
    console.log("New user");
    const welcomeMessage = `Hi ${name}, Welcome to the WhatsApp Bot! This is your first time using the bot!\nGood Luck!!`;
  }

  const finalMsg = `\n${commandRes}\n`;
  console.log(userInfo)

  if (userInfo.role === "OWNER") {
    return sendMessageToBot({
      message: finalMsg,
    });
  }

  await sendMessageToUser({
    message: finalMsg,
    chatId,
  });

  // TODO: Add logic to check
  console.log("Leaving processMessageSend\n");

  return {
    commandRes,
    userInfo,
  };
};
