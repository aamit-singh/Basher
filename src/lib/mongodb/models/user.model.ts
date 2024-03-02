import { IUser } from "@/types/user.types";
import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    photo: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
