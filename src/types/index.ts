import { Roles } from "../models/models";

export type Req_type = {
  name: string;
  cmd: string;
  chatId: string;
};

export type ReturnType =
  | "SUCCESS" // happy path
  | "INVALID_CMD" // invalid command
  | "NOTES_NOT_FOUND" // when the respective notes don't exist
  | "PLAYLIST_NOT_FOUND" // when the playlist doesn't exist
  | "BAN" // when the user is using higher level command
  | "NO_CLASS" // when the class doesn't exist
  | "NO_CALENDAR"; // when the calendar doesn't exist

export type Res_Type = {
  message: string;
  chatId: string;
};

export type UserType = {
  name: string;
  chatId: string;
  role: Roles;
  newUser: boolean;
};

export type Notes = {
  name: string;
  content: {
    name: string;
    link: string;
  }[];
}[];

export type Playlist = {
  name: string;
  link: string;
}[];
