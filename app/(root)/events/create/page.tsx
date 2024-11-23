import { EventForm } from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs/server";
import Container from "@/components/shared/Container";

const CreateEvent = () => {
  const { sessionClaims } = auth();
  console.log("sessionClaims: ", sessionClaims);
  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-16">
        <Container>
          <h3 className="text-3xl font-bold text-center sm:text-left">
            Create Event
          </h3>
          <div className="pt-6">
            <EventForm userId={userId} type="Create" />
          </div>
        </Container>
      </section>
    </>
  );
};

export default CreateEvent;
