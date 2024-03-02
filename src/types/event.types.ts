import { QueryOptions, Types } from "mongoose";

export interface IEvent extends Document {
  _id: string;
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

export interface PopulatedEvent extends Omit<IEvent, "organizer"> {
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
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
    eventLocation: string;
    startDateTime: Date;
    endDateTime: Date;
    category: string;
    price: number;
    url: string;
  };
  path: string;
};

export type DeleteEventParams = {
  eventId: string;
  path: string;
};

export type GetAllEventParams = {
  query: QueryOptions<IEvent>;
  limit?: number;
  skip?: number;
};
