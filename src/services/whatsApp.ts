import axiosInstance from "../axios";
import { Res_Type } from "../types";

export const sendMessageToBot = ({ message }: { message: string }) => {
  console.log("\nEntering sendMessageToBot" + "\n" + "message: " + message);
  return axiosInstance.post("/wa-service/api/sendMsgToBot", { message });
};

export const sendMessageToUser = ({ message, chatId }: Res_Type) => {
  console.log("\nEntering sendMessageToUser" + "\n" + "message: " + message);
  return axiosInstance.post("/wa-service/api/sendMessage", {
    message,
    chatId,
  });
};

