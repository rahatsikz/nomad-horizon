import { Bricolage_Grotesque, Martian_Mono, Newsreader } from 'next/font/google';
import { HomeFooter } from './_components/HomeFooter';
import { HomeNavbar } from './_components/HomeNavbar';
import './home.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz', 'wdth'],
  variable: '--font-bricolage',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-newsreader',
  display: 'swap',
});

const martianMono = Martian_Mono({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-martian',
  display: 'swap',
});

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${bricolage.variable} ${newsreader.variable} ${martianMono.variable} nh-home relative flex min-h-screen flex-col bg-ground font-text text-ink antialiased`}
    >
      <div aria-hidden="true" className="nh-grain" />
      <HomeNavbar />
      <main className="flex-1">{children}</main>
      <HomeFooter />
    </div>
  );
}
