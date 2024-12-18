import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { MdDateRange } from "react-icons/md";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};
const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event?.organizer?._id?.toString();

  return (
    <div className="group relative flex w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-lg">
      <Link
        href={`/events/${event?._id}`}
        style={{ backgroundImage: `url(${event?.imageUrl})` }}
        className="flex-center flex-grow h-[200px] bg-gray-50 bg-cover bg-center text-grey-500"
      />

      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/events/${event?._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>

          <DeleteConfirmation eventId={event?._id} />
        </div>
      )}

      <div className="flex  flex-col gap-3 p-6 py-8 md:gap-4">
        <div className="flex items-center justify-between">
          <p className="text-pink-500 capitalize text-sm">
            {event?.category?.name}
          </p>
          {!hidePrice && (
            <div className="flex gap-2">
              <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60 line-clamp-1">
                {event?.isFree ? "FREE" : `$${event?.price}`}
              </span>
            </div>
          )}
        </div>

        <Link href={`/events/${event?._id}`}>
          <h3 className="p-medium-16 capitalize md:p-medium-20 font-semibold text-xl !leading-normal line-clamp-2 flex-1 text-black">
            {event?.title}
          </h3>
        </Link>

        <p className="p-medium-16 p-medium-18 flex items-center gap-2 text-grey-500">
          <IoLocationSharp color="#f6699e" size={24} />
          {event?.location}
        </p>

        <p className="p-medium-16 p-medium-18 flex items-center gap-2 text-grey-500">
          <MdDateRange color="#f6699e" size={24} />
          {formatDateTime(event?.startDateTime)?.dateTime}
        </p>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {event?.organizer?.firstName} {event?.organizer?.lastName}
          </p>

          {hasOrderLink && (
            <Link href={`/orders?eventId=${event?._id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
