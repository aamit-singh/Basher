"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/mongodb/models/user.model";
import Event from "@/lib/mongodb/models/event.model";
import { convertToJSON, handleError } from "@/lib/utils";

import { CreateUserParams, UpdateUserParams } from "@/types";

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);
    return convertToJSON(newUser);
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");
    return convertToJSON(user);
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    return convertToJSON(updatedUser);
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Unlink relationships
    await Event.updateMany(
      { _id: { $in: userToDelete.events } },
      { $pull: { organizer: userToDelete._id } }
    );

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? convertToJSON(deletedUser) : null;
  } catch (error) {
    handleError(error);
  }
}
