'use client';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Sets each line at whatever size makes it span the full container width.
 * CSS container units give a close first paint; JS then measures and corrects.
 */
export function FitLines({
  lines,
  className,
  lineClassNames,
  charWidth = 0.78,
}: {
  lines: string[];
  className?: string;
  lineClassNames?: (string | undefined)[];
  charWidth?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const fit = () => {
      const available = root.clientWidth;
      root.querySelectorAll<HTMLElement>('[data-fit-line]').forEach((line) => {
        const inner = line.firstElementChild as HTMLElement | null;
        if (!inner) return;
        line.style.fontSize = '100px';
        const natural = inner.getBoundingClientRect().width;
        if (natural > 0) line.style.fontSize = `${Math.floor((100 * available * 0.995 * 100) / natural) / 100}px`;
      });
    };

    fit();
    document.fonts?.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={cn('block [container-type:inline-size]', className)}>
      {lines.map((line, idx) => (
        <span
          key={line}
          data-fit-line
          className={cn('block whitespace-nowrap', lineClassNames?.[idx])}
          style={{ fontSize: `calc(100cqi / ${(line.length * charWidth).toFixed(2)})` }}
        >
          <span className="inline-block">{line}</span>
        </span>
      ))}
    </span>
  );
}
