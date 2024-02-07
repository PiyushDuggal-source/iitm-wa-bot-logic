import {
  ADMIN_CMDS,
  BOT_CHECK_MESSAGES,
  COMMANDS,
  NOTES_CMD,
  PLAYLIST_CMD,
  SOURCE,
} from "../cmds/commands";
import { random } from "../common";
import { NotesModel, PlaylistModel, User, UserModel } from "../models/models";
import { BOT_ONLINE_RES, GREETINGS, REACT_EMOGIES } from "../replies";
import { Notes, Playlist } from "../types";

const notesFormatter = (notes: Notes) => {
  let content = "";
  notes.forEach((note) => {
    content += `\n\n*_NAME_* : ${note.name
      .split("|")[0]
      .trim()}\n\n -----------*Content*------------`;
    note.content.forEach((noteContent) => {
      content += `\n\nName: _*${noteContent.name}*_\nLink: ${noteContent.link}`;
    });
  });
  return content;
};

const playlistFormatter = (playlist: Playlist) => {
  let content = "\n-----------*Content*------------\n";
  playlist.forEach((note) => {
    content += `_Name_ : *${note.name.split("|")[0].trim()}*\n_Link_ : ${
      note.link
    }\n`;
  });
  return content;
};

export const createNotesRes = async (filteredWords?: string[]) => {
  console.log("\nEntering createNotesRes");
  if (filteredWords) {

    const regex = new RegExp(
      filteredWords.map((word) => `(?=.*\\b${word}\\b)`).join(""),
      "i",
    );

    const filteredNotes: Notes = await NotesModel.find({
      $or: [
        { name: { $regex: regex } }, // Match top-level 'name'
        { "content.name": { $regex: regex } }, // Match 'name' inside 'content'
      ],
    });

    if (filteredNotes.length === 0) {
      return "No Notes Found";
    }
    console.log("Leaving createNotesRes\n");
    return notesFormatter(filteredNotes);
  }
  const notes: Notes = await NotesModel.find({});
  console.log("Leaving createNotesRes\n");
  console.log("Leaving createCmdResponse\n");
  return notesFormatter(notes);
};

export const createPlaylistRes = async (filteredWords?: string[]) => {
  console.log("\nEntering createPlaylistRes");
  if (filteredWords) {

    const regex = new RegExp(
      filteredWords.map((word) => `\\b${word}\\b`).join(".*"),
      "i",
    );

    console.log(`regex: ${regex}`);

    const filteredNotes: Playlist = await PlaylistModel.find({
      name: { $regex: regex },
    });
    if (filteredNotes.length === 0) {
      return "No Playlist Found";
    }
    console.log("Leaving createPlaylistRes\n");
    return playlistFormatter(filteredNotes);
  }
  const playlist: Playlist = await PlaylistModel.find({});
  console.log("Leaving createPlaylistRes\n");
  console.log("Leaving createCmdResponse\n");
  return playlistFormatter(playlist);
};

type CmdType = "STUDENT" | "ADMIN";

/**
 * Determines the type of command based on the given input.
 *
 * @param {string} cmd - The command to be checked.
 * @return {CmdType} The type of command: "ADMIN" or "STUDENT".
 */
export const checkCmdType = (cmd: string): CmdType => {
  console.log("\nEntering checkCmdType");
  if (cmd.split(" ").length < 2) {
    console.log("Leaving checkCmdType\n");
    return "STUDENT";
  }

  const cmdType = cmd.split(" ")[0];
  const isAdminCmd = ADMIN_CMDS.includes(cmdType);

  console.log("Leaving checkCmdType\n");
  return isAdminCmd ? "ADMIN" : "STUDENT";
};

export const createBotOnlineRes = () => {
  return BOT_ONLINE_RES[random(BOT_ONLINE_RES.length)];
};

const ALLCMDS = {
  "Allcmds 🤖": COMMANDS,
  "Botcheck ✅": BOT_CHECK_MESSAGES,
  "Notes 📝": NOTES_CMD,
  "Playlist 📹": PLAYLIST_CMD,
  "Source 👨‍💻": SOURCE,
};

export const createAllCmdResponse = () => {
  console.log("\nEntering createAllCmdResponse");
  let message = `Hey ${GREETINGS[random(GREETINGS.length)]} ${
    REACT_EMOGIES[random(REACT_EMOGIES.length)]
  }\nThis is *${
    process.env.BOT_NAME
  }*, your study assistant!\nThese are the commands you can use:\n`;
  Object.entries(ALLCMDS).forEach(([command, cmdList]) => {
    message += `\nfor *${command}*:\n`;
    cmdList.forEach((cmd) => {
      message += `-   !${cmd}\n`;
    });
  });

  message += `\nIf you have any queries or suggestions, please contact @Piyush Duggal.\nThanks! Happy learning! ${
    REACT_EMOGIES[random(REACT_EMOGIES.length)]
  }`;
  console.log("Leaving createAllCmdResponse\n");
  return message;
};

export const createSourceCmdRes = () => {
  const message = `Hey, Checkout how I *${process.env.BOT_NAME}* created!!${
    REACT_EMOGIES[random(REACT_EMOGIES.length)]
  }\n
Check the Source Code from here:\n
https://github.com/PiyushDuggal-source/IITM-WA-BOT\n
Give it a *star* 🌟, if you like it!\n
Got any Suggestions/Issues? Report here:\n
https://github.com/PiyushDuggal-source/IITM-WA-BOT/issues\n

Want to contribute?😎 ping @Piyush Duggal!`;

  return message;
};

const leaderBoardFormatter = (users: User[]) => {
  console.log("\nEntering leaderBoardFormatter");
  const sortedUsers = users.sort((a, b) => b.numberOfCmds - a.numberOfCmds);
  let message = `*Leaderboard*
-------------------------------------------------------------
|                                                                          |
|     *NUMBER*     | *NUMBER OF COMMANDS* |
|                                                                          |
`;

  for (let i = 0; i < sortedUsers.length; i++) {
    
    if (i > 9) continue;
    else if (i === 0) {
      message += `| ${sortedUsers[i].recipitantId.split("@")[0]} | ${
        sortedUsers[i].numberOfCmds
      } | 🥇\n`;
    } else if (i === 1) {
      message += `| ${sortedUsers[i].recipitantId.split("@")[0]} | ${
        sortedUsers[i].numberOfCmds
      } | 🥈\n`;
    } else if (i === 2) {
      message += `| ${sortedUsers[i].recipitantId.split("@")[0]} | ${
        sortedUsers[i].numberOfCmds
      } | 🥉\n`;
    } else {
      message += `| ${sortedUsers[i].recipitantId.split("@")[0]} | ${
        sortedUsers[i].numberOfCmds
      } |\n`;
    }
  }

  message += `|                                    |
              --------------------------------------`;
  console.log("Leaving leaderBoardFormatter\n");
  return message;
};

export const createLeaderBoardCmdRes = async () => {
  console.log("\nEntering createLeaderBoardCmdRes");
  const LEADERBOARD_MIN_SCORE = 12;

  const users = await UserModel.find({
    numberOfCmds: { $gte: LEADERBOARD_MIN_SCORE },
  });

  const message = leaderBoardFormatter(users);

  console.log("Leaving createLeaderBoardCmdRes\n");
  return message;
};
