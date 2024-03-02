"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EventFormSchema } from "@/lib/validator";
import { eventDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { Textarea } from "../ui/textarea";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUploadThing } from "@/lib/uploadthing";
import { createEvent } from "@/lib/actions/event.actions";
import { useRouter } from "next/navigation";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
};

const EventForm = ({ userId, type }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("imageUploader");
  const Router = useRouter();

  const initialValues = eventDefaultValues;

  const form = useForm<z.infer<typeof EventFormSchema>>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof EventFormSchema>) {
    const eventData = { ...values };

    if (files.length) {
      const uploadedImageUrls = await startUpload(files);
      if (!uploadedImageUrls) return;
      eventData.imageUrl = uploadedImageUrls[0].url;
    }

    if (type === "Create") {
      // create event
      try {
        const newEvent = await createEvent({
          event: eventData,
          userId,
          path: "/profile",
        });

        if (newEvent) {
          form.reset();
          Router.push(`/event/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col items-center w-full max-w-lg mx-auto"
        >
          <div className="flex flex-col gap-5 w-full ">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Party Name"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Dropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 w-full">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea
                      placeholder="Description"
                      {...field}
                      className="text-area rounded-2xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventLocation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center w-full overflow-hidden rounded-full bg-gray-50 h-[54px] px-4 py-4">
                      <Image
                        src="/assets/icons/location.svg"
                        alt="location"
                        width={20}
                        height={20}
                        className="filter-grey"
                      />
                      <Input
                        placeholder="Location"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center w-full overflow-hidden rounded-full bg-gray-50 h-[54px] px-4 py-4">
                      <Image
                        src="/assets/icons/date-time.svg"
                        alt="location"
                        width={20}
                        height={20}
                        className="filter-grey"
                      />
                      <p className="ml-3 whitespace-nowrap text-gray-600">
                        Start Date:
                      </p>
                      <DatePicker
                        selected={field.value}
                        onChange={(date: Date) => field.onChange(date)}
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat={"MMMM d, yyyy h:mm aa"}
                        wrapperClassName="datePicker"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center w-full overflow-hidden rounded-full bg-gray-50 h-[54px] px-4 py-4">
                      <Image
                        src="/assets/icons/date-time.svg"
                        alt="location"
                        width={20}
                        height={20}
                        className="filter-grey"
                      />
                      <p className="ml-3 whitespace-nowrap text-gray-600">
                        End Date:
                      </p>
                      <DatePicker
                        selected={field.value}
                        onChange={(date: Date) => {
                          console.log(date);
                          field.onChange(date);
                        }}
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat={"MMMM d, yyyy h:mm aa"}
                        wrapperClassName="datePicker"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center w-full overflow-hidden rounded-full bg-gray-50 h-[54px] px-4 py-4">
                      <Image
                        src="/assets/icons/rupee.svg"
                        alt="location"
                        width={20}
                        height={20}
                        className="filter-grey"
                      />
                      <Input
                        placeholder="Price"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center w-full overflow-hidden rounded-full bg-gray-50 h-[54px] px-4 py-4">
                      <Image
                        src="/assets/icons/link.svg"
                        alt="location"
                        width={20}
                        height={20}
                        className="filter-grey"
                      />
                      <Input
                        placeholder="URL"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button col-span-2"
          >
            {form.formState.isSubmitting ? "Submitting..." : `${type} Event`}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EventForm;
