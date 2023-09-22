import axiosInstance from "../axios";
import { Res_Type } from "../types";

export const sendMessageToBot = ({ message, groupId }: { message: string, groupId: string }) => {
  console.log("\nEntering sendMessageToBot");
  return axiosInstance.post("/wa-service/api/sendMsgToBot", { message, groupId });
};

export const sendMessageToUser = ({ message, chatId }: Res_Type) => {
  console.log("\nEntering sendMessageToUser");
  return axiosInstance.post("/wa-service/api/sendMessage", {
    message,
    chatId,
  });
};

