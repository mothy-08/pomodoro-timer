import "./globals.css";
import "./globalicon.css";
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
      <body className={`${roboto.className} overflow-hidden antialiased`}>
        {children}
      </body>
    </html>
  );
}
