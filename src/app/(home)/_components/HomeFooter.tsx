import Link from 'next/link';

const importantLinks = ['About Us', 'Contact Us', 'Privacy Policy', 'Terms & Conditions'];
const socialLinks = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'];

export function HomeFooter() {
  return (
    <footer className="mt-28 border-t border-ink bg-paper">
      <div className="nh-container pb-10 pt-12 lg:pt-16">
        <p className="nh-soft font-display text-[clamp(3.25rem,12.5vw,12.5rem)] font-light leading-[0.85] tracking-[-0.03em]">
          Nomad <em className="nh-wonk font-extrabold italic text-terracotta">Horizon</em>
        </p>

        <div className="mt-12 grid gap-10 border-t border-ink/15 pt-8 sm:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-2 font-meta text-xs leading-relaxed text-inkMuted lg:col-span-5">
            <p className="text-ink">Colophon</p>
            <p>Phone: +1 (123) 456-7890</p>
            <p>Address: 123 Street, Virginia, USA</p>
            <p>© {new Date().getFullYear()} Nomad Horizon. All rights reserved.</p>
          </div>

          <FooterColumn title="Important Links" links={importantLinks} className="lg:col-span-3 lg:col-start-7" />
          <FooterColumn title="Social Links" links={socialLinks} className="lg:col-span-3" />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="font-meta text-xs uppercase tracking-[0.22em] text-inkMuted">{title}</h2>
      <ul className="mt-4 space-y-2">
        {links.map((label) => (
          <li key={label}>
            <Link href="/" className="font-display text-lg transition-colors hover:text-terracottaInk">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
