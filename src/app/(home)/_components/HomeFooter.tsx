import Link from 'next/link';

const credits: { role: string; items: { label: string; href?: string }[] }[] = [
  { role: 'Phone', items: [{ label: '+1 (123) 456-7890' }] },
  { role: 'Address', items: [{ label: '123 Street, Virginia, USA' }] },
  {
    role: 'Important Links',
    items: [
      { label: 'About Us', href: '/' },
      { label: 'Contact Us', href: '/' },
      { label: 'Privacy Policy', href: '/' },
      { label: 'Terms & Conditions', href: '/' },
    ],
  },
  {
    role: 'Social Links',
    items: [
      { label: 'Facebook', href: '/' },
      { label: 'Twitter', href: '/' },
      { label: 'Instagram', href: '/' },
      { label: 'LinkedIn', href: '/' },
    ],
  },
];

/** End-credits footer. */
export function HomeFooter() {
  return (
    <footer className="relative isolate mt-32 overflow-hidden border-t border-fg/10 pt-24 lg:mt-44">
      <div aria-hidden="true" className="nh-glow absolute -bottom-[35vw] left-1/2 -z-10 size-[70vw] -translate-x-1/2" />
      <div className="nh-container">
        <p className="nh-label text-center text-amberText">Credits</p>
        <dl className="mx-auto mt-12 max-w-3xl space-y-8">
          {credits.map(({ role, items }) => (
            <div key={role} className="grid grid-cols-2 gap-6 sm:gap-10">
              <dt className="nh-label pt-1 text-right text-fgMuted">{role}</dt>
              <dd className="space-y-1.5">
                {items.map((item) =>
                  item.href ? (
                    <Link key={item.label} href={item.href} className="block w-fit transition-colors hover:text-amberText">
                      {item.label}
                    </Link>
                  ) : (
                    <span key={item.label} className="block">
                      {item.label}
                    </span>
                  ),
                )}
              </dd>
            </div>
          ))}
        </dl>

        <p
          aria-hidden="true"
          className="mt-24 select-none text-center font-display text-[clamp(2.2rem,11.2vw,11.5rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.06em]"
        >
          Nomad Horizon
        </p>
        <p className="nh-label pb-10 pt-8 text-center text-fgMuted">
          © {new Date().getFullYear()} Nomad Horizon. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
