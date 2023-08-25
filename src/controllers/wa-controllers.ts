import { sendMessageToBot, sendMessageToUser } from "../services/whatsApp";
import { Req_type } from "../types";
import { getUserData } from "./user-controllers";

export const processMessageSend = async (
  messageObject: Req_type,
  commandRes: string,
) => {
  console.log("\nEntering processMessageSend");
  const { name, chatId } = messageObject;
  const userInfo = await getUserData({
    name,
    chatId,
  });

  if (userInfo.newUser) {
    console.log("New user");
    const welcomeMessage = `Hi ${name}, Welcome to the WhatsApp Bot! This is your first time using the bot!\nGood Luck!!`;
  }

  const finalMsg = `${commandRes}\n`;
  console.log(userInfo);

  if (userInfo.role === "OWNER") {
    return sendMessageToBot({
      message: finalMsg,
    });
  }

  return await sendMessageToUser({
    message: finalMsg,
    chatId,
  });
};
