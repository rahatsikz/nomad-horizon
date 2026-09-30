import React from "react";

/** An amber light sweeping along a thin rail — the site's loading state. */
export default function LoadingComponent() {
  return (
    <section
      role='status'
      aria-live='polite'
      className='flex h-60 flex-col items-center justify-center gap-4'
    >
      <div className='relative h-px w-40 overflow-hidden bg-fg/15'>
        <div className='nh-scan absolute inset-y-0 left-0 w-1/3 bg-amber shadow-[0_0_12px_rgb(var(--nh-amber))]' />
      </div>
      <p className='nh-label text-fgMuted'>Loading</p>
    </section>
  );
}

export const SkeletonServiceLoading = () => {
  return (
    <div
      aria-hidden='true'
      className='aspect-[3/4] w-full animate-pulse rounded-sm bg-raised motion-reduce:animate-none'
    />
  );
};
