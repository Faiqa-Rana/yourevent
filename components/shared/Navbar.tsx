"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Container from "./Container";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const navData = [
  {
    id: "23f5h2",
    title: "Home",
    path: "/",
  },
  {
    id: "k01h6d",
    title: "Create Event",
    path: "/events/create",
  },
  {
    id: "76qw0d",
    title: "My Profile",
    path: "/profile",
  },
];

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="py-4 sticky top-0 bg-white z-50">
      <Container>
        <div className="flex relative items-center justify-between">
          <Link
            href="/"
            className="text-pink-500 flex flex-col text-2xl font-bold uppercase"
          >
            Your
            <span className="border border-black text-center text-sm text-black">
              Event
            </span>
          </Link>

          <div className="md:hidden flex  items-center gap-5 justify-center">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <button onClick={toggleMobileMenu} aria-label="Toggle Menu">
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          <div
            className={`${
              isMobileMenuOpen
                ? "block absolute top-full w-full bg-white z-10 py-8"
                : "hidden"
            } md:flex items-center gap-10`}
          >
            <SignedIn>
              <div>
                <ul className="flex flex-col md:flex-row gap-6">
                  {navData.map((navItem) => {
                    const isActive = pathname == navItem.path;
                    return (
                      <li key={navItem.id} className="font-medium">
                        <Link
                          href={navItem.path}
                          passHref
                          className={`${
                            isActive ? "text-pink-500" : "text-black"
                          } p-2 transition-all hover:text-pink-500`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {navItem.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </SignedIn>

            <div className="hidden md:block">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>

            <SignedOut>
              <div className="flex items-center gap-8 mt-4 md:mt-0">
                <Button variant="pink">
                  <Link href="/sign-in">Login</Link>
                </Button>
              </div>
            </SignedOut>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
