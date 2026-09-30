import Link from 'next/link';
import { CompassMark } from './HomeNavbar';
import { Topo } from './Topo';

const importantLinks = [
  { label: 'About Us', symbol: '◆' },
  { label: 'Contact Us', symbol: '▲' },
  { label: 'Privacy Policy', symbol: '●' },
  { label: 'Terms & Conditions', symbol: '■' },
];
const socialLinks = [
  { label: 'Facebook', symbol: '◇' },
  { label: 'Twitter', symbol: '△' },
  { label: 'Instagram', symbol: '○' },
  { label: 'LinkedIn', symbol: '□' },
];

export function HomeFooter() {
  return (
    <footer className="relative isolate mt-28 overflow-hidden border-t-2 border-ink bg-surface">
      <Topo variant="footer" animate={false} className="absolute inset-0 -z-10 size-full" />
      <div className="nh-container grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <CompassMark className="size-12" />
            <p className="font-display text-4xl font-extrabold tracking-[-0.05em] sm:text-5xl">Nomad Horizon</p>
          </div>
          <dl className="mt-8 space-y-3 font-ticket text-[11px] uppercase tracking-[0.12em]">
            <div className="flex gap-3">
              <dt className="w-20 text-inkMuted">Phone</dt>
              <dd>+1 (123) 456-7890</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-20 text-inkMuted">Base camp</dt>
              <dd>123 Street, Virginia, USA</dd>
            </div>
          </dl>
          <p className="mt-8 font-text text-inkMuted">
            © {new Date().getFullYear()} Nomad Horizon. All rights reserved.
          </p>
        </div>

        <div className="rounded-lg border-2 border-ink bg-surface p-6 lg:col-span-6 lg:col-start-7">
          <p className="border-b-2 border-ink pb-3 font-ticket text-xs uppercase tracking-[0.3em]">Legend</p>
          <div className="mt-5 grid gap-8 sm:grid-cols-2">
            <LegendColumn title="Important Links" links={importantLinks} />
            <LegendColumn title="Social Links" links={socialLinks} />
          </div>
        </div>
      </div>
    </footer>
  );
}

function LegendColumn({ title, links }: { title: string; links: { label: string; symbol: string }[] }) {
  return (
    <div>
      <h2 className="font-display text-lg font-extrabold tracking-[-0.02em]">{title}</h2>
      <ul className="mt-3 space-y-2">
        {links.map(({ label, symbol }) => (
          <li key={label}>
            <Link href="/" className="group flex items-center gap-3 hover:text-signalText">
              <span aria-hidden="true" className="w-4 text-center text-xs text-signalText">
                {symbol}
              </span>
              <span className="underline-offset-4 group-hover:underline">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
