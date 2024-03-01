import { z } from "zod";

export const EventFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z
    .string()
    .min(10, "Discription must be at least 10 characters")
    .max(400, "Discription must be at most 400 characters"),
  eventLocation: z
    .string()
    .min(5, "Location must be at least 5 characters")
    .max(400, "Location must be at most 400 characters"),
  imageUrl: z.string().url("Invalid Image URL"),
  startDateTime: z.date(),
  endDateTime: z.date(),
  price: z.number().min(0, "Price must be at least 0"),
  url: z.string().url("Invalid URL"),
  categoryId: z.string(),
});
