import axiosInstance from "../axios";

export const sendMessageToBot = ({ message }: { message: string }) => {
  console.log("\nEntering sendMessageToBot" + "\n" + "message: " + message);
  return axiosInstance.post("/api/v1/whatsapp/sendMessage", { message });
};
