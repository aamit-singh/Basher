import { IEvent } from "@/types/event.types";
import { Schema, model, models } from "mongoose";

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    eventLocation: { type: String },
    imageUrl: { type: String },
    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date, required: true },
    price: { type: Number, required: true },
    url: { type: String },
    category: { type: String },
    organizer: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Event = models.Event || model<IEvent>("Event", EventSchema);

export default Event;
