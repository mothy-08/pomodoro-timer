import "./globals.css";
import { Roboto } from "next/font/google";
import type { Metadata } from "next";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Pomodoro Timer",
  description: "A simple Pomodoro Timer inspired by roadmap.sh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}
