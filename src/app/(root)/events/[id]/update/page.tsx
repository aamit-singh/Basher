import EventForm from "@/components/shared/EventForm";
import React from "react";

const UpdateEvent = () => {
  const userId = "test"; // remove this later and use the actual user id
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-10">
        <h3 className="wrapper h3-bold text-center">Update Event</h3>
      </section>
      <div className="wrapper my-8">
        <EventForm type="Update" userId={userId} />
      </div>
    </>
  );
};

export default UpdateEvent;
