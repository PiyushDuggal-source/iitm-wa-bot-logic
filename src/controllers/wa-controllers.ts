import { sendMessageToBot, sendMessageToUser } from "../services/whatsApp";
import { Req_type, ReturnType } from "../types";
import { createCmdResponse } from "./cmd-controller";
import { getUserData } from "./user-controllers";

export const processMessageSend = async (messageObject: Req_type) => {
  console.log("\nEntering processMessageSend");
  console.log(messageObject);
  const { name, chatId, messageBody: cmd } = messageObject;
  const userInfo = await getUserData({
    name,
    chatId,
  });

  const commandRes = await createCmdResponse(cmd);
  if (userInfo.newUser) {
    console.log("New user");
    const welcomeMessage = `Hi ${name}, Welcome to the WhatsApp Bot! This is your first time using the bot!\nGood Luck!!`;
  }

  const finalMsg = `\n${commandRes}\n`;

  await sendMessageToUser({
    message: finalMsg,
    chatId,
    type: "SUCCESS",
    emoji: "✅",
  });

  // TODO: Add logic to check
  console.log("Leaving processMessageSend\n");

  return "SUCCESS";
};
