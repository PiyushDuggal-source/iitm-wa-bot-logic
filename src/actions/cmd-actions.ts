import { Notes } from "../types";

const notesFormatter = (notes: Notes, content: string) => {
  notes.forEach((note) => {
    content += `\n\n*_NAME_* : *${note.name}*\n\n -----------*Content*------------`;
    note.content.forEach((noteContent) => {
      content += `\n\nName of the Notes: _${noteContent.name}_\nLink: ${noteContent.link}`;
    });
  });
  return content;
};
