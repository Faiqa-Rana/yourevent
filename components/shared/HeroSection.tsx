import Link from "next/link";
import { Button } from "../ui/button";
import Container from "./Container";
import { SignedOut } from "@clerk/nextjs";

const HeroSection = () => {
  return (
    <section className="relative flex px-5 text-white">
      <img
        src="/images/hero-bg.jpg"
        alt="hero-bg"
        className="h-[650px] md:h-[850px] relative after:absolute after:inset-0 after:bg-black w-full rounded-lg object-cover"
      />
      <div className="absolute px-10 left-0 right-0 top-1/2 -translate-y-1/2">
        <Container>
          <div className="">
            <h1 className="text-3xl md:text-6xl !leading-tight font-semibold">
              Celebrate, Connect, and Host:
              <br /> Your Events, Elevated by <br />
              <span className="bg-pink-500">Our Platform!</span>
            </h1>
            <p className="text-lg md:text-2xl mt-6 xl:w-1/2">
              Create unforgettable events with ease. Our platform simplifies
              hosting, connecting, and celebrating—so you can focus on what
              matters most.
            </p>

            <div className="flex flex-col sm:flex-row mt-20 gap-5">
              <SignedOut>
                <Link href="/login">
                  <Button
                    variant="pink"
                    className="rounded-full w-full sm:w-max px-12 !py-6 font-medium text-lg"
                  >
                    Create Event
                  </Button>
                </Link>
              </SignedOut>

              <a href="#events">
                <Button
                  variant="secondary"
                  className="rounded-full px-12 !py-6 font-medium text-lg"
                >
                  View Events
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default HeroSection;
