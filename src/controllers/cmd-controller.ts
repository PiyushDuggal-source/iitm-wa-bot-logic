import { NOTES_CMD } from "../cmds/commands";
import { NotesModel } from "../models/models";
import { Notes } from "../types";

export const createCmdResponse = async (cmd: string) => {
  console.log(`\nEntering createCmdResponse with cmd: ${cmd}`);
  // check if cmd word length is 2
  if (cmd.split(" ").length === 2) {
    let [command, filterWord] = cmd.split(" ");
    // check if cmd is "filter"
    command = command.toLowerCase();
    switch (command) {
      // if its notes cmd
      case NOTES_CMD.filter((cmd) => cmd === command)[0]:

        const regex = new RegExp(filterWord, "i");
        console.log(`regex: ${regex}`);
        const filteredNotes: Notes = await NotesModel.find({
          name: { $regex: regex },
        });

        return filteredNotes;


    }
  }
  console.log("Leaving createCmdResponse\n");
};
