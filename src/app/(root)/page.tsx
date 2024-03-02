import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Collection from "@/components/shared/Collection";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;

  const events = await getAllEvents({
    query: {},
    limit: 6,
    skip: (page - 1) * 6,
  });
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5">
        <div className="wrapper grid grid-cols-1 gap-5 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Lets Party Hard: Your Bash, Our Platform!
            </h1>
            <p className="p-regular-20 ">
              Book a slot in our premium locations and get services for all your
              party needs wherever and whenever you need.
            </p>
            <Button size="lg" asChild className="button w-fit">
              <Link href="#events">Book now</Link>
            </Button>
          </div>
        </div>
      </section>
      <section id="events" className="wrapper my-8 flex flex-col">
        <h2 className="h2-bold">
          Trusted by <br /> Thousands of party animals.
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row m-5"></div>
        <Collection
          data={events?.data || []}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
        />
      </section>
    </>
  );
}
