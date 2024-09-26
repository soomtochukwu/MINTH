"use client";

import localFont from "next/font/local";
import "../globals.css";
import Footer from "./Footer";
import { coOrdinate, coOrdinateOut } from "../utils/mousy";

import { Providers } from "../providers";
import Mousy from "./Mousy";
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

export default function Body({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body
      onMouseMove={coOrdinate}
      onMouseOut={coOrdinateOut}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      {/* mousys */}
      <Mousy></Mousy>
      <Providers>{children}</Providers>
      <Footer />
    </body>
  );
}
