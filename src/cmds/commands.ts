import dotenv from "dotenv";
dotenv.config();
export const allCommandLvls = {
  // Student Commands
  help: 1,
  online: 1,
  cmd: 1,
  ping: 1,
  class: 1,
  cls: 1,
  calendar: 1,
  notes: 1,
  note: 1,
  allcmds: 1,
  allcmd: 1,
  allcommands: 1,
  playlist: 1,
  source: 1,
  grouplink: 1,

  // Admin Commands
  add: 2,
  remove: 2,
  ban: 2,
  unban: 2,
  kick: 2,
  mute: 2,
  unmute: 2,

  // Owner Commands
  everyone: 3,
};

export const COMMANDS = ["allcmd"];
export const CALENDAR_COMMANDS = ["classes", "calendar", "clss"];
export const CALENDAR_TYPOS = [
  "calender",
  "calandars",
  "celandars",
  "celandar",
  "calandar",
];
export const CLASS_COMMAND = ["class", "today", "subject"];
export const BOT_NAME_S = [`${process.env.BOT_NAME as String}`];
export const NOTES_CMD = ["notes", "cheats", "note", "cheat"];
export const NOTES_CMD_Show = [
  "notes <filter>",
  "cheats <filter>",
  "note <filter>",
  "cheat <filter>",
];
export const COMMANDS_CMDS = [
  `allcmds`,
  `allcmd`,
];
export const HELP_CMDS = ["help", "hlp"];
export const SOURCE = ["source"];
export const IMP_DATES = ["impdates", "importantdates", "dates"];
export const ELIGIBILITY = ["eligibility", "eligible"];
export const PLAYLIST_CMD = ["playlist", "plst"];
export const BOT_CHECK_MESSAGES = ["check", "up", "bot", "online"];
export const HIGHER_PREV_CMDS_2 = [
  "remove",
  "add",
  "kick",
  "ban",
];

export const User_AllCommands: string[][] = [
  CALENDAR_COMMANDS,
  CLASS_COMMAND,
  COMMANDS,
  NOTES_CMD,
  PLAYLIST_CMD,
  HELP_CMDS,
  BOT_CHECK_MESSAGES,
  SOURCE,
];

export const ADMIN_CMDS: string[] = HIGHER_PREV_CMDS_2;
