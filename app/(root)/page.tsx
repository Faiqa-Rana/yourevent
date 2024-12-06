import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import HeroSection from "@/components/shared/HeroSection";

import Search from "@/components/shared/Search";
import Container from "@/components/shared/Container";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";
  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <>
      <HeroSection />

      <section id="events" className="py-20 scroll-mt-28">
        <Container>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              Trusted by Thousands of Events
            </h2>
            <p className="text-gray-600 text-lg mt-2">
              Browse a wide range of events hosted by professionals around the
              world.
            </p>
          </div>

          <div className="flex flex-col mb-14  border rounded-md p-8 gap-6 md:flex-row">
            <Search />
            <CategoryFilter />
          </div>

          <Collection
            data={events?.data}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={6}
            page={page}
            totalPages={events?.totalPages}
          />
        </Container>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-purple-700 text-white py-12">
        <div className="wrapper text-center flex flex-col gap-6">
          <h3 className="text-3xl font-bold">
            Ready to Make Your Event Unforgettable?
          </h3>
          <p className="text-lg">
            Manage your events effortlessly with our powerful web app! Create
            events by adding all the essential details, including titles,
            categories, descriptions, images, locations, prices, and dates.
            Track and manage your organized events and purchased tickets easily
            through your personalized profile page. Enjoy secure and seamless
            payment processing powered by Stripe, ensuring your transactions are
            fast and reliable.
          </p>
        </div>
      </section>
    </>
  );
}
