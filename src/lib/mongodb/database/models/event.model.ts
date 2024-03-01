import { Schema, model, models, Types } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  eventLocation: string;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price: number;
  url: string;
  category: { _id: Types.ObjectId; name: string };
  organizer: { _id: Types.ObjectId; firstName: string; lastName: string };
}

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
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    organizer: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Event = models.Event || model<IEvent>("Event", EventSchema);

export default Event;
