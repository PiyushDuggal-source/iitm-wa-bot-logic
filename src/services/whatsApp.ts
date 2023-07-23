import axiosInstance from "../axios";
import { Res_Type } from "../types";

export const sendMessageToBot = ({ message }: { message: string }) => {
  console.log("\nEntering sendMessageToBot" + "\n" + "message: " + message);
  return axiosInstance.post("/api/v1/whatsapp/sendMessage", { message });
};

export const sendMessageToUser = ({
  message,
  chatId,
  type,
  emoji,
}: Res_Type) => {
  console.log("\nEntering sendMessageToUser" + "\n" + "message: " + message);
  return axiosInstance.post("/sendMessage", {
    message,
    chatId,
    type,
    emoji,
  });
};
