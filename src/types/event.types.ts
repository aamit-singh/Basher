import { Types } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  eventLocation: string;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price: number;
  url: string;
  category: string;
  organizer: Types.ObjectId;
}

export type CreateEventParams = {
  userId: string;
  event: {
    title: string;
    description: string;
    eventLocation: string;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    category: string;
    price: number;
    url: string;
  };
  path: string;
};

export type UpdateEventParams = {
  userId: string;
  event: {
    _id: string;
    title: string;
    imageUrl: string;
    description: string;
    location: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url: string;
  };
  path: string;
};
