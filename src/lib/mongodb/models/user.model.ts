import { IUser } from "@/types/user.types";
import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    photo: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
