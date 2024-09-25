"use client";

import localFont from "next/font/local";
import "../globals.css";
import Footer from "./Footer";

import { Providers } from "../providers";
import { coOrdinate } from "../utils/mousy";
import Image from "next/image";
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const tails = ["art03", "art02", "art01"];

export default function Body({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body
      onMouseMove={coOrdinate}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      {/* mousys */}
      <div>
        <span className="fixed top-0 left-0 coord z-10" id="coord"></span>
        {tails.map((path, index) => {
          return (
            <Image
              key={index + path}
              className={`fixed invisible z-20 ${path} tail`}
              src={`/${path}.png`}
              alt={path}
              width={25}
              height={25}
            ></Image>
          );
        })}
      </div>
      <Providers>{children}</Providers>
      <Footer />
    </body>
  );
}
