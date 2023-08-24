import { createNotesRes } from "../actions/cmd-actions";
import { NOTES_CMD } from "../cmds/commands";

export const createCmdResponse = async (cmd: string) => {
  console.log(`\nEntering createCmdResponse with cmd: ${cmd}`);

  // check if cmd word length is 2
  if (cmd.split(" ").length === 2) {
    let [command, filterWord] = cmd.split(" ");
    // check if cmd is "filter"
    switch (command) {
      // if its notes cmd
      case NOTES_CMD.filter((cmd) => cmd === command)[0]:
        return createNotesRes(filterWord);
    }
  } else {
    switch (cmd) {
      case NOTES_CMD.filter((command) => command === cmd)[0]:
        return createNotesRes();
      default:
        return "No such command";
    }
  }
  console.log("Leaving createCmdResponse\n");
};
