//import CheckoutButton from '@/components/shared/CheckoutButton';
import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import Container from "@/components/shared/Container";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event?.category?._id,
    eventId: event?._id,
    page: searchParams?.page as string,
  });

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <Container>
          <div className="grid grid-cols-1 py-5 md:grid-cols-2 2xl:max-w-7xl">
            <Image
              src={event?.imageUrl}
              alt="hero image"
              width={1000}
              height={1000}
              className="h-full rounded-xl min-h-[300px] object-cover object-center"
            />
            <div className="flex w-full flex-col gap-8 p-5 md:p-10">
              <div className="flex flex-col gap-6">
                <h2 className="font-bold text-3xl capitalize">
                  {event?.title}
                </h2>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex gap-3">
                    <p className="p-bold-20 rounded-full bg-green-500/10 flex items-center justify-center px-5 py-2 text-green-700">
                      {event?.isFree ? "FREE" : `$${event?.price}`}
                    </p>
                    <p className="p-medium-16 capitalize rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                      {event?.category?.name}
                    </p>
                  </div>
                  <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                    by{" "}
                    <span className="text-primary-500">
                      {event?.organizer?.firstName} {event?.organizer?.lastName}
                    </span>
                  </p>
                </div>
              </div>
              <CheckoutButton event={event} />
              <div className="flex flex-col gap-5">
                <div className="flex gap-2 md:gap-3">
                  <MdDateRange color="#f6699e" size={34} />
                  <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                    <p>
                      {formatDateTime(event?.startDateTime)?.dateOnly} -{" "}
                      {formatDateTime(event?.startDateTime)?.timeOnly}
                    </p>
                    <p>
                      {formatDateTime(event?.endDateTime)?.dateOnly} -{" "}
                      {formatDateTime(event?.endDateTime)?.timeOnly}
                    </p>
                  </div>
                </div>
                <div className="p-regular-20 flex items-center gap-3">
                  <IoLocationSharp color="#f6699e" size={34} />
                  <p className="p-medium-16 lg:p-regular-20">
                    {event?.location}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="p-bold-20 text-grey-600">What You'll Learn:</p>
                <p className="p-medium-16 lg:p-regular-18">
                  {event?.description}
                </p>
                <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
                  {event?.url}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* EVENTS with the same category */}
      <section className="wrapper my-8 mt-14 flex flex-col gap-8 md:gap-12">
        <Container>
          <h2 className="text-2xl font-bold mb-6">Related Events</h2>
          <Collection
            data={relatedEvents?.data}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={3}
            page={searchParams.page as string}
            totalPages={relatedEvents?.totalPages}
          />
        </Container>
      </section>
    </>
  );
};

export default EventDetails;
