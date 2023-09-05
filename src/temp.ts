// // create a script which will upload all the notes in the mongoDB
//
// import { NotesModel } from "./models/models";
// import { NOTES } from "./temp/notes";
//
// // Path: temp.ts
// export const fun = () => {
//   NOTES.forEach(async (note) => {
//     const { name, content } = note;
//     const model = new NotesModel({
//       name,
//       content,
//     });
//
//     model.save().then(() => {
//       console.log("saved");
//     });
//   });
// };
