import { model, Schema } from "mongoose";

export type Roles = "ADMIN" | "STUDENT" | "OWNER";

export type User = {
  name: string;
  roles: Roles;
  recipitantId: string;
  banCount: number;
  notifyForEvents: Boolean;
  numberOfCmds: number;
};

const users = new Schema<User>({
  name: { type: String, default: "Student"},
  recipitantId: { type: String },
  notifyForEvents: { type: Boolean, default: true },
  banCount: { type: Number, default: 0},
  roles: { type: String, default: "STUDENT" },
  numberOfCmds: { type: Number, default: 0 },
});

export const UserModel = model("Users", users);
