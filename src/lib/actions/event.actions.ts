"use server";

import {
  CreateEventParams,
  DeleteEventParams,
  GetAllEventParams,
  PopulatedEvent,
  UpdateEventParams,
} from "@/types";
import { connectToDatabase } from "../mongodb";
import Event from "../mongodb/models/event.model";
import User from "../mongodb/models/user.model";
import { convertToJSON, handleError } from "../utils";
import { PopulateOptions } from "mongoose";
import { revalidatePath } from "next/cache";

export const getEventById = async ({
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
    return convertToJSON(event);
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
    return convertToJSON(newEvent);
  } catch (error) {
    handleError(error);
  }
};

export const getAllEvents = async ({
  query,
  limit = 6,
  skip = 0,
}: GetAllEventParams) => {
  try {
    await connectToDatabase();
    const events = await Event.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate([{ path: "organizer", select: "_id firstName lastName" }]);
    const totalCount = await Event.countDocuments(query);
    const eventsObj = convertToJSON(events);
    return {
      data: eventsObj as PopulatedEvent[],
      totalCount,
    };
  } catch (error) {
    handleError(error);
  }
};

export async function deleteEvent({ eventId, path }: DeleteEventParams) {
  try {
    await connectToDatabase();

    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (deletedEvent) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

export async function updateEvent({ userId, event, path }: UpdateEventParams) {
  try {
    await connectToDatabase();

    const eventToUpdate = await Event.findById(event._id);
    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error("Unauthorized or event not found");
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.category },
      { new: true }
    );
    revalidatePath(path);

    return convertToJSON(updatedEvent);
  } catch (error) {
    handleError(error);
  }
}
