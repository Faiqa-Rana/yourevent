import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white text-purple-900">
      <div className="wrapper flex flex-col items-center gap-6 py-8 sm:flex-row sm:justify-between">
        {/* Logo Section */}
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={150}
            height={45}
            className="transition-transform hover:scale-105"
          />
        </Link>

        {/* Footer Links */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
          <Link href="/about" className="hover:text-purple-300">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-purple-300">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-purple-300">
            Privacy Policy
          </Link>
        </div>

        {/* Copyright Section */}
        <p className="text-center text-sm sm:text-left">
          © 2024 <span className="font-bold">YourEvent</span>. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
