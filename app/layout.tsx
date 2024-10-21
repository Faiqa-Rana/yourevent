import type { Metadata } from "next";
import  poppins from "next/font/local";
import "./globals.css";
import { ClerkProvider} from "@clerk/nextjs";

const Poppins = poppins({
  src: "./fonts/GeistVF.woff",
  variable: "--font-poppins",
  weight: "400 500 600 700",
});

export const metadata: Metadata = {
  title: "YourEvent",
  description: "It is a platform for events",
  icons:'/assets/images/logo.svg'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${Poppins.variable} ${Poppins.variable} antialiased`}
      >
        
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}

