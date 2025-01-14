import "./globals.css";
import { roboto } from "./ui/fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pomdoro Timer",
  description: "A simple Pomodoro Timer inspired by roadmap.sh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}
