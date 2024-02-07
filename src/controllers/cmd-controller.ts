import { Request, Response } from "express";
import {
  checkCmdType,
  createAllCmdResponse,
  createBotOnlineRes,
  createLeaderBoardCmdRes,
  createNotesRes,
  createPlaylistRes,
  createSourceCmdRes,
} from "../actions/cmd-actions";
import {
  BOT_CHECK_MESSAGES,
  COMMANDS,
  LEADERBOARD_CMDS,
  NOTES_CMD,
  PLAYLIST_CMD,
  SOURCE,
} from "../cmds/commands";
import { sendMessageToBot } from "../services/whatsApp";
import { NO_NOTES_FOUND, REACT_EMOGIES } from "../replies";
import { random } from "../common";
import { processMessageSend } from "./wa-controllers";
import { getUserData } from "./user-controllers";
import { Req_type } from "../types";

export const createCmdResponse = async (cmd: string) => {
  console.log(`\nEntering createCmdResponse with cmd: ${cmd}`);

  // check if cmd has a parameter
  if (cmd.split(" ").length >= 2) {
    let command = cmd.split(" ")[0];
    command = command.trim();
    const filteredQuery = cmd.split(" ").slice(1)
    console.log(filteredQuery)

    // check if cmd is "filter"
    switch (command) {
      // if its notes cmd
      case NOTES_CMD.filter((cmd) => cmd === command)[0]:
        return createNotesRes(filteredQuery);

      // If its Playlist cmd
      case PLAYLIST_CMD.filter((cmd) => cmd === command)[0]:
        return createPlaylistRes(filteredQuery);

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

      case COMMANDS.filter((command) => command === cmd)[0]:
        return createAllCmdResponse();

      default:
        console.log("Leaving createCmdResponse\n");
        return "No such command";
    }
  }
};

export const processingRequest = async (
  cmd: string,
  req: Request<{}, {}, Req_type>,
  res: Response,
) => {
  console.log(`\nEntering processingRequest with cmd: ${cmd}`);
  const { name, chatId,groupId } = req.body;

  const userInfo = await getUserData({ name, chatId });

  // everyone cmd controller
  if (cmd === "everyone" && userInfo.role === "OWNER") {
    // owner controller
    sendMessageToBot({
      message: "OWNER CMD",
      groupId
    });
    res.json({
      status: "success",
      emoji: "🗿"
    });
    return;
  }
  const cmdType = checkCmdType(cmd);

  // source cmd controller
  if (SOURCE.includes(cmd)) {
    sendMessageToBot({
      message: createSourceCmdRes(),
      groupId
    });
    res.json({
      status: "success",
      emoji: REACT_EMOGIES[random(REACT_EMOGIES.length)],
    });
    return;
  }

  // LeaderBoard cmd controller
  if (LEADERBOARD_CMDS.includes(cmd)) {
  const leaderBoardCmdRes = await createLeaderBoardCmdRes();
    sendMessageToBot({
      message: leaderBoardCmdRes,
      groupId
    });
    res.json({
      status: "success",
      emoji: REACT_EMOGIES[random(REACT_EMOGIES.length)],
    });
    return;
  }

  if (cmdType === "ADMIN" && ["ADMIN", "OWNER"].includes(userInfo.role)) {
    // admin controller
    sendMessageToBot({
      message: "ADMIN CMD",
      groupId
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
      groupId
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
