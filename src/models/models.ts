import { model, Schema } from "mongoose";

export type Roles = "ADMIN" | "STUDENT" | "OWNER";

export type User = {
  name: string;
  role: Roles;
  recipitantId: string;
  banCount: number;
  notifyForEvents: Boolean;
  numberOfCmds: number;
};

const users = new Schema<User>({
  name: { type: String, default: "Student" },
  recipitantId: { type: String },
  notifyForEvents: { type: Boolean, default: true },
  banCount: { type: Number, default: 0 },
  role: { type: String, default: "STUDENT" },
  numberOfCmds: { type: Number, default: 0 },
});

const notes = new Schema({
  name: { type: String },
  content: [
    {
      name: { type: String },
      link: { type: String },
    },
  ],
});

export const playList = new Schema({
  name: { type: String },
  link : { type: String },
})
export const NotesModel = model("Notes", notes);
export const UserModel = model("Users", users);
export const PlaylistModel = model("Playlist", playList);
