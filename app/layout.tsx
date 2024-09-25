import type { Metadata } from "next";
import Body from "./components/Body";
export const metadata: Metadata = {
  title: "Minth | For NFTs",
  description: "Generate and Mint your NFTs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Body>{children}</Body>
    </html>
  );
}
