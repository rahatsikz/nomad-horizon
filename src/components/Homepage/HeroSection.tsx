export function HeroSection() {
  return (
    <div className='relative isolate overflow-hidden dark:bg-gray-800 bg-slate-100 border-b dark:border-gray-700'>
      <SquarePatttern />
      <HeroClipPathGradient />
      <div className='mx-auto px-6 pb-24 pt-10 sm:pb-32 lg:flex justify-center items-center lg:px-8 lg:py-40'>
        <div className='mx-auto flex-shrink-0 lg:mx-0 lg:max-w-2xl lg:pt-8 text-center'>
          <h1 className='mt-10 text-4xl font-bold tracking-tight text-secondary sm:text-6xl'>
            Digital Services for Nomads Worldwide
          </h1>
          <p className='mt-6 text-lg leading-8 dark:text-gray-300 text-gray-600'>
            Your ultimate hub for seamless internet connectivity and mobile
            solutions to expert laptop servicing, we ensure you stay productive
            and worry-free
          </p>
        </div>
      </div>
    </div>
  );
}

export function SquarePatttern() {
  return (
    <svg
      className='absolute inset-0 -z-10 h-full w-full dark:stroke-white/10 stroke-black/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
      aria-hidden='true'
    >
      <defs>
        <pattern
          id='983e3e4c-de6d-4c3f-8d64-b9761d1534cc'
          width={200}
          height={200}
          x='50%'
          y={-1}
          patternUnits='userSpaceOnUse'
        >
          <path d='M.5 200V.5H200' fill='none' />
        </pattern>
      </defs>
      <rect
        width='100%'
        height='100%'
        strokeWidth={0}
        fill='url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)'
      />
    </svg>
  );
}

export function HeroClipPathGradient() {
  return (
    <div
      className='absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]'
      aria-hidden='true'
    >
      <div
        className='aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[var(--primary)] to-cyan-700 opacity-20'
        style={{
          clipPath:
            "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
        }}
      />
    </div>
  );
}
