import { Barlow_Condensed, Figtree, Share_Tech_Mono } from 'next/font/google';
import { HomeFooter } from './_components/HomeFooter';
import { HomeNavbar } from './_components/HomeNavbar';
import './home.css';

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
});

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-share-tech-mono',
  display: 'swap',
});

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${barlowCondensed.variable} ${figtree.variable} ${shareTechMono.variable} nh-home nh-overhead relative flex min-h-screen flex-col overflow-x-clip bg-ground font-text text-ink antialiased`}
    >
      <HomeNavbar />
      <main className="flex-1">{children}</main>
      <HomeFooter />
    </div>
  );
}
