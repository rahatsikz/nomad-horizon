import type { Metadata } from "next";
import "./globals.css";
import { Hanken_Grotesk, Instrument_Serif, Syne } from "next/font/google";
import Providers from "@/lib/Providers";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nomad Horizon",
  description: "Give service to travelers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${syne.variable} ${instrumentSerif.variable} ${hanken.variable} bg-canvas font-text text-fg antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
