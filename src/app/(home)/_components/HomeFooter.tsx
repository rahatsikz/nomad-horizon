import Link from 'next/link';
import {
  ArrowPictogram,
  BaggagePictogram,
  InfoPictogram,
  LaptopPictogram,
  PlanePictogram,
  WifiPictogram,
} from './Pictograms';

const importantLinks = ['About Us', 'Contact Us', 'Privacy Policy', 'Terms & Conditions'];
const socialLinks = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'];
const pictogramStrip = [PlanePictogram, WifiPictogram, LaptopPictogram, BaggagePictogram, InfoPictogram];

export function HomeFooter() {
  return (
    <footer className="mt-24 bg-board text-white lg:mt-32">
      <div className="bg-sign text-onSign">
        <div className="nh-container flex items-center justify-between gap-4 py-3">
          <p className="font-sign text-lg font-bold uppercase tracking-[0.08em]">Nomad Horizon — all gates</p>
          <div aria-hidden="true" className="flex gap-3">
            {pictogramStrip.map((Pictogram, idx) => (
              <Pictogram key={idx} className="size-6" />
            ))}
          </div>
        </div>
      </div>

      <div className="nh-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-sign text-5xl font-extrabold uppercase leading-none">Nomad Horizon</p>
          <div className="mt-6 space-y-1 text-white/80">
            <p>Phone: +1 (123) 456-7890</p>
            <p>Address: 123 Street, Virginia, USA</p>
          </div>
        </div>
        <FooterList title="Important Links" links={importantLinks} className="lg:col-span-3 lg:col-start-7" />
        <FooterList title="Social Links" links={socialLinks} className="lg:col-span-3" />
      </div>

      <div className="border-t border-white/10">
        <p className="nh-container py-5 text-sm text-white/70">
          © {new Date().getFullYear()} Nomad Horizon. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FooterList({ title, links, className }: { title: string; links: string[]; className?: string }) {
  return (
    <div className={className}>
      <h2 className="font-sign text-sm font-semibold uppercase tracking-[0.16em] text-sign">{title}</h2>
      <ul className="mt-4 space-y-2">
        {links.map((label) => (
          <li key={label}>
            <Link href="/" className="group inline-flex items-center gap-2 font-sign text-xl font-semibold hover:text-sign">
              {label}
              <ArrowPictogram className="size-4 opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
