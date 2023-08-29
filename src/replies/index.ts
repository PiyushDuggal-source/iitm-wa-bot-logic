import { ReturnType } from "../types";

export const replies: {
  [key in Exclude<ReturnType, "SUCCESS" | "INVALID_CMD">]: string | string[];
} = {
  NOTES_NOT_FOUND:
    "The filter is invalid, please use your *permutation* and *combination* knowledge to search for your notes, like:\n*!notes math1* -> *!notes math*\nor else, please wait for a while, we will upload the respective notes soon",
  PLAYLIST_NOT_FOUND:
    "The playlist is invalid, please use your *permutation* and *combination* knowledge to search for your playlist, like:\n*!playlist math1* -> *!playlist math*",
  BAN: "Hey, you cannot perform this command, this command is only for the admin(s)",
  NO_CLASS: [
    `FINALLY *IITian* you are *free*... but wait.. not so fast... THIS IS ONLY FOR THIS DAY... from next day... you will suffer again..... 😈

      ERROR 🚫 ERROR 🚫 ERROR 🚫 ERROR
      ERROR 🚫 ERROR 🚫 ERROR 🚫 ERROR
      ERROR 🚫 ERROR 🚫 ERROR 🚫 ERROR
      ERROR 🚫 ERROR 🚫 ERROR 🚫 ERROR

      Process loading: 0%
      Process loading: 50%
      Process loading: 100%

      back online::
      ${
        process.env.BOT_NAME as String
      } : Sorry fellas, an Evil took my place, now everything is fine!!! and yea... *There is no class today!* 😅

      `,

    `*There is no Class Today!!* \nGive some of your precious time and think about me and help me be a better BOT!!\nor Go take some rest and work on *something special* to you, utilize your *free* time!\n*Never stop learning!*
       `,

    `Q1: There are N number of classes today and N = 0 then guess how many classes are there? *1 Point*\nA: NO Class\nB: C\nC: A`,

    "no class today",
  ],
  NO_CALENDAR: "Unfortunately, we don't have any calendar for today",
};

export const NO_CMD_FOUND = [
  "Hey fella, this commands does not exists",
  "Hey mate, there is no such command",
];

export const NO_NOTES_FOUND = [
  "Hey fella, there are no respective notes, if you think we should add them, please mention @Piyush Duggal in this message.",
];

export const REACT_EMOGIES = [
  "😌",
  "✌",
  "🤟",
  "🤝",
  "👌",
  "🫂",
  "🌚",
  "🌝",
  "⚡",
  "🥳",
  "😎",
  "🗿",
];
