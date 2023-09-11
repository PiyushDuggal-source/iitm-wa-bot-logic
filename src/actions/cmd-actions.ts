import {
  ADMIN_CMDS,
  BOT_CHECK_MESSAGES,
  COMMANDS,
  NOTES_CMD,
  PLAYLIST_CMD,
} from "../cmds/commands";
import { random } from "../common";
import { NotesModel, PlaylistModel } from "../models/models";
import { BOT_ONLINE_RES, GREETINGS, REACT_EMOGIES } from "../replies";
import { Notes, Playlist } from "../types";

const notesFormatter = (notes: Notes) => {
  let content = "";
  notes.forEach((note) => {
    content += `\n\n*_NAME_* : *${note.name}*\n\n -----------*Content*------------`;
    note.content.forEach((noteContent) => {
      content += `\n\nName of the Notes: _${noteContent.name}_\nLink: ${noteContent.link}`;
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

export const createNotesRes = async (filteredWord?: string) => {
  console.log("\nEntering createNotesRes");
  if (filteredWord) {
    const regex = new RegExp(filteredWord, "i");
    console.log(`regex: ${regex}`);
    const filteredNotes: Notes = await NotesModel.find({
      name: { $regex: regex },
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

export const createPlaylistRes = async (filteredWord?: string) => {
  console.log("\nEntering createPlaylistRes");
  if (filteredWord) {
    const regex = new RegExp(filteredWord, "i");
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
  if (cmd.split(" ").length !== 2) {
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
  "allcmds 🤖": COMMANDS,
  "Botcheck ✅": BOT_CHECK_MESSAGES,
  "Notes 📝": NOTES_CMD,
  "playlist 📹": PLAYLIST_CMD,
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
