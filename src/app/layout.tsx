import type { Metadata } from "next";
import "./globals.css";
import { Reddit_Mono as RedditFont } from "next/font/google";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

const redditFont = RedditFont({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
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
    <html lang='en'>
      <body className={`${redditFont.className} flex flex-col min-h-screen`}>
        <Navbar />
        <div className='flex-1 bg-mainBg'>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
