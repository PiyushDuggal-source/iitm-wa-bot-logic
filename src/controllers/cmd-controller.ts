import { Request, Response } from "express";
import {
  checkCmdType,
  createBotOnlineRes,
  createNotesRes,
  createPlaylistRes,
} from "../actions/cmd-actions";
import { BOT_CHECK_MESSAGES, NOTES_CMD, PLAYLIST_CMD } from "../cmds/commands";
import { sendMessageToBot } from "../services/whatsApp";
import { NO_NOTES_FOUND, REACT_EMOGIES } from "../replies";
import { random } from "../common";
import { processMessageSend } from "./wa-controllers";
import { getUserData } from "./user-controllers";

export const createCmdResponse = async (cmd: string) => {
  console.log(`\nEntering createCmdResponse with cmd: ${cmd}`);

  // check if cmd has a parameter
  if (cmd.split(" ").length === 2) {
    let [command, filterWord] = cmd.split(" ");
    command = command.trim();

    // check if cmd is "filter"
    switch (command) {
      // if its notes cmd
      case NOTES_CMD.filter((cmd) => cmd === command)[0]:
        return createNotesRes(filterWord);

      // If its Playlist cmd
      case PLAYLIST_CMD.filter((cmd) => cmd === command)[0]:
        return createPlaylistRes(filterWord);

      default:
        console.log("Leaving createCmdResponse\n");
        return "No such command";
    }
  } else {
    switch (cmd) {
      case NOTES_CMD.filter((command) => command === cmd)[0]:
        return createNotesRes();

      // if its bot check messages
      case BOT_CHECK_MESSAGES.filter((command) => command === cmd)[0]:
        return createBotOnlineRes();

      case PLAYLIST_CMD.filter((command) => command === cmd)[0]:
        return createPlaylistRes();
      default:
        console.log("Leaving createCmdResponse\n");
        return "No such command";
    }
  }
};

export const processingRequest = async (
  cmd: string,
  req: Request,
  res: Response,
) => {
  console.log(`\nEntering processingRequest with cmd: ${cmd}`);
  const { name, chatId } = req.body;

  const userInfo = await getUserData({ name, chatId });

  if (cmd === "everyone" && userInfo.role === "OWNER") {
    // owner controller
    sendMessageToBot({
      message: "OWNER CMD",
    });
    res.json({
      status: "success",
      emoji: REACT_EMOGIES[random(REACT_EMOGIES.length)],
    });
    return;
  }
  const cmdType = checkCmdType(cmd);

  if (cmdType === "ADMIN" && ["ADMIN", "OWNER"].includes(userInfo.role)) {
    // admin controller
    sendMessageToBot({
      message: "ADMIN CMD",
    });
    res.json({
      status: "success",
      emoji: REACT_EMOGIES[random(REACT_EMOGIES.length)],
    });
    return;
  }

  const commandRes = await createCmdResponse(cmd);
  if (commandRes === "No Notes Found") {
    sendMessageToBot({
      message: NO_NOTES_FOUND[random(NO_NOTES_FOUND.length)],
    });
    res.json({ status: "No notes found" });
  } else if (commandRes === "No such command") {
    res.json({ status: commandRes });
  } else {
    res.json({
      status: "success",
      emoji: REACT_EMOGIES[random(REACT_EMOGIES.length)],
    });
    await processMessageSend(req.body, commandRes as string, userInfo);
  }
};
