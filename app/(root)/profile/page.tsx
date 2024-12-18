import Collection from "@/components/shared/Collection";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";
const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });
  const orders = await getOrdersByUser({ userId, page: ordersPage });
  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <Container>
          <div className="wrapper flex items-center justify-center sm:justify-between">
            <h3 className="font-bold text-3xl text-center sm:text-left">
              My Tickets
            </h3>
            <Button
              asChild
              variant="pink"
              size="lg"
              className="button hidden sm:flex rounded-full"
            >
              <Link href="/#events">Explore More Events</Link>
            </Button>
          </div>
        </Container>
      </section>

      <section className="wrapper my-8">
        <Container>
          <Collection
            data={orderedEvents}
            emptyTitle="No event tickets purchased yet"
            emptyStateSubtext="No worries - plenty of exciting events to explore!"
            collectionType="My_Tickets"
            limit={3}
            page={ordersPage}
            urlParamName="ordersPage"
            totalPages={orders?.totalPages}
          />
        </Container>
      </section>

      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <Container>
          <div className="wrapper flex items-center justify-center sm:justify-between">
            <h3 className="font-bold text-3xl text-center sm:text-left ">
              Events Organized
            </h3>
            <Button
              asChild
              size="lg"
              variant="pink"
              className="button hidden sm:flex rounded-full"
            >
              <Link href="/events/create">Create New Event</Link>
            </Button>
          </div>
        </Container>
      </section>
      <section className="wrapper my-8">
        <Container>
          <Collection
            data={organizedEvents?.data}
            emptyTitle="No events have been created yet"
            emptyStateSubtext="Go create some now"
            collectionType="Events_Organized"
            limit={3}
            page={eventsPage}
            urlParamName="eventsPage"
            totalPages={organizedEvents?.totalPages}
          />
        </Container>
      </section>
    </>
  );
};
export default ProfilePage;
