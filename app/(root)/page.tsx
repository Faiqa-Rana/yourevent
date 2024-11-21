import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Collection from "@/components/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Search from "@/components/shared/Search";
import CategoryFilter from "@/components/shared/CategoryFilter";

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
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900 text-white py-12 md:py-20">
        <div className="wrapper grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Host, Connect, Celebrate: <br />
              <span className="text-yellow-400">
                Your Events, Our Platform!
              </span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed">
              Discover and book events while learning helpful tips from 3000+
              mentors in top companies across the globe.
            </p>
            <Button
              size="lg"
              asChild
              className="bg-yellow-400 text-purple-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 w-full sm:w-fit"
            >
              <Link href="#events">Explore Now!</Link>
            </Button>
          </div>
          <Image
            src="/assets/images/hero.png"
            alt="Hero Image"
            width={1000}
            height={1000}
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="wrapper py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-3xl font-bold">
            Trusted by Thousands of Events
          </h2>
          <p className="text-gray-600 text-lg mt-2">
            Browse a wide range of events hosted by professionals around the
            world.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={[]}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-purple-700 text-white py-12">
        <div className="wrapper text-center flex flex-col gap-6">
          <h3 className="text-3xl font-bold">
            Ready to Make Your Event Unforgettable?
          </h3>
          <p className="text-lg">
            Join our platform and connect with the best event hosts and
            organizers today!
          </p>
          <Button
            size="lg"
            asChild
            className="bg-yellow-400 text-purple-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 w-full sm:w-fit mx-auto"
          >
            <Link href="/Signup">Get Started</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
