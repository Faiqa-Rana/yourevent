import Container from "@/components/shared/Container";
import { EventForm } from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs/server";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const event = await getEventById(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-16">
        <Container>
          <h3 className="text-3xl font-bold text-center sm:text-left">
            Update Event
          </h3>
          <div className="pt-6">
            <EventForm
              type="Update"
              event={event}
              eventId={event._id}
              userId={userId}
            />{" "}
          </div>
        </Container>
      </section>
    </>
  );
};

export default UpdateEvent;
