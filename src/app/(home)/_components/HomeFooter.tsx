import Link from 'next/link';
import { FitLines } from './FitLines';

const importantLinks = ['About Us', 'Contact Us', 'Privacy Policy', 'Terms & Conditions'];
const socialLinks = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'];

export function HomeFooter() {
  return (
    <footer className="mt-16 border-t border-ink lg:mt-24">
      <div className="nh-container">
        <div className="border-x border-ink">
          <p aria-hidden="true" className="nh-wide border-b border-ink px-3 pb-3 pt-6 font-black uppercase leading-[0.8] tracking-[-0.045em] sm:px-5">
            <FitLines lines={['Nomad Horizon']} />
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-12">
            <div className="border-b border-ink p-5 text-sm leading-relaxed sm:border-r lg:col-span-4 lg:border-b-0 lg:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-inkMuted">Contact</p>
              <p className="mt-4">Phone: +1 (123) 456-7890</p>
              <p>Address: 123 Street, Virginia, USA</p>
            </div>
            <FooterList title="Important Links" links={importantLinks} className="border-b border-ink lg:col-span-3 lg:border-b-0 lg:border-r" />
            <FooterList title="Social Links" links={socialLinks} className="border-b border-ink sm:border-r lg:col-span-3 lg:border-b-0" />
            <p className="flex items-end p-5 text-xs font-bold uppercase tracking-[0.14em] lg:col-span-2 lg:p-6">
              © {new Date().getFullYear()} Nomad Horizon. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, links, className }: { title: string; links: string[]; className?: string }) {
  return (
    <div className={`p-5 lg:p-6 ${className ?? ''}`}>
      <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-inkMuted">{title}</h2>
      <ul className="mt-4 space-y-1">
        {links.map((label) => (
          <li key={label}>
            <Link href="/" className="nh-focus -mx-1 inline-block px-1 text-sm font-semibold hover:bg-ink hover:text-paper">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
