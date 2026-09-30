import Link from "next/link";
import { cn } from "@/lib/utils";

/** Typographic logo: NOMAD·HORIZON in Syne with an amber interpunct. */
export function Wordmark({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      aria-label='Nomad Horizon home'
      className={cn(
        "font-display font-extrabold uppercase tracking-[-0.02em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber",
        className
      )}
    >
      Nomad<span className='text-amberText'>·</span>Horizon
    </Link>
  );
}
