"use server";

import { CreateEventParams } from "@/types";
import { connectToDatabase } from "../mongodb";
import Event from "../mongodb/models/event.model";
import User from "../mongodb/models/user.model";
import { handleError } from "../utils";
import { PopulateOptions } from "mongoose";

export const getEvent = async ({
  id,
  populate = [],
}: {
  id: string;
  populate: PopulateOptions[];
}) => {
  try {
    await connectToDatabase();
    const event = await Event.findById(id).populate(populate);
    if (!event) throw new Error("Event not found");
    return event.toJSON();
  } catch (error) {
    handleError(error);
  }
};

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDatabase();
    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not found");

    const newEvent = await Event.create({
      ...event,
      organizer: userId,
    });
    return newEvent.toJSON();
  } catch (error) {
    handleError(error);
  }
};

export const getAllEvents = async () => {
  try {
    await connectToDatabase();
    const events = await Event.find({});
    return events.map((event) => event.toJSON());
  } catch (error) {
    handleError(error);
  }
};
