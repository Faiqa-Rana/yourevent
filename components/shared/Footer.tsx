import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

const footerData = [
  {
    id: "23f5h2",
    title: "About",
    path: "/about",
  },
  {
    id: "k01h6d",
    title: "Contact",
    path: "/contact",
  },
  {
    id: "76qw0d",
    title: "Privacy Policy",
    path: "/privacy-policy",
  },
];

const Footer = () => {
  return (
    <footer className="bg-white ">
      <Container>
        <div className="flex flex-col items-center gap-6 py-8 sm:flex-row sm:justify-between">
          {/* Logo Section */}
          <Link
            href="/"
            className="text-pink-500 flex flex-col text-2xl font-bold uppercase"
          >
            Your
            <span className="border border-black text-center text-sm text-black">
              Event
            </span>
          </Link>

          {/* Footer Links */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
            {footerData.map((linkData) => (
              <Link
                key={linkData.id}
                href={linkData.path}
                className="hover:text-pink-500 transition-all"
              >
                {linkData.title}
              </Link>
            ))}
          </div>

          <p className="text-center text-sm sm:text-left">
            © 2024 <span className="font-bold text-pink-500">YourEvent</span>.
            All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
