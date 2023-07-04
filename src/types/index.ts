export type Req_type = {
  messageBody: string;
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
  type: ReturnType;
};
