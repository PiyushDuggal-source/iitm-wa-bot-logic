import { NotesModel } from "../models/models";
import { Notes } from "../types";

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
  return notesFormatter(notes);
};
