import { sendMessageToBot, sendMessageToUser } from "../services/whatsApp";
import { Req_type, UserType } from "../types";

/**
 * Processes a message send by a user.
 *
 * @param {Req_type} messageObject - The message object containing the message details.
 * @param {string} commandRes - The command response string.
 * @param {UserType} userInfo - The user info object.
 */
export const processMessageSend = async (
  messageObject: Req_type,
  commandRes: string,
  userInfo: UserType,
) => {
  console.log("\nEntering processMessageSend");
  const { name, chatId } = messageObject;

  let welcomeMessage = "";
  if (userInfo.newUser) {
    console.log("New user");
    welcomeMessage = `Hi ${name}, Welcome to the WhatsApp Bot! This is your first time using the bot!\nGood Luck!! `;
  }

  const finalMsg = `${process.env.BOT_NAME}: ${welcomeMessage}${
    welcomeMessage !== "" ? "\n" : ""
  }${commandRes}`;
  console.log(userInfo);

  if (userInfo.role === "OWNER") {
    return await sendMessageToBot({
      message: finalMsg,
    });
  }

  return await sendMessageToUser({
    message: finalMsg,
    chatId,
  });
};
