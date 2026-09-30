'use client';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$-';
export const FLAP_TICK_MS = 50;

/**
 * Drives every flap on a board from one clock. Returns null once settled (or when the
 * user prefers reduced motion), which renders the final text directly.
 */
export function useFlapClock(run: boolean, totalTicks: number) {
  const [tick, setTick] = useState<number | null>(null);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let current = 0;
    setTick(0);
    const id = window.setInterval(() => {
      current += 1;
      if (current >= totalTicks) {
        window.clearInterval(id);
        setTick(null);
      } else {
        setTick(current);
      }
    }, FLAP_TICK_MS);

    return () => window.clearInterval(id);
  }, [run, totalTicks]);

  return tick;
}

/**
 * A row of split-flap characters. Before `start` the flaps are blank, then they scramble
 * and each settles one tick after its left-hand neighbour, starting at `settle`.
 */
export function FlapText({
  text,
  width,
  tick,
  start = 0,
  settle = 0,
  className,
}: {
  text: string;
  width: number;
  tick: number | null;
  start?: number;
  settle?: number;
  className?: string;
}) {
  const chars = text.toUpperCase().padEnd(width, ' ').slice(0, width).split('');

  return (
    <span aria-hidden="true" className={cn('flex gap-[0.1em]', className)}>
      {chars.map((target, i) => {
        let shown = target;
        if (tick !== null) {
          if (tick < start) shown = ' ';
          else if (tick < settle + i) shown = CHARSET[(i * 7 + tick * 13 + start * 3) % CHARSET.length];
        }
        return (
          <span
            key={i}
            className="nh-flap inline-flex h-[1.55em] w-[1em] shrink-0 items-center justify-center overflow-hidden rounded-[2px] bg-flap font-board leading-none"
          >
            <span key={shown} className="nh-flap-char">
              {shown === ' ' ? ' ' : shown}
            </span>
          </span>
        );
      })}
    </span>
  );
}
