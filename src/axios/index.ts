import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-bot-api": process.env.BOT_API,
  },
});

export default axiosInstance;
