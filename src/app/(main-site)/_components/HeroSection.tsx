export function HeroSection() {
  return (
    <div className="group relative isolate overflow-hidden border-b border-black/10 bg-[radial-gradient(circle_at_20%_10%,rgba(118,171,174,0.2),transparent_34%),linear-gradient(135deg,var(--nomad-gray),var(--main-bg))] dark:border-white/10">
      <HeroClipPathGradient />
      <div className="mx-auto px-6 pb-24 pt-10 sm:pb-32 lg:flex justify-center items-center lg:px-8 lg:py-40">
        <div className="mx-auto flex-shrink-0 text-center lg:mx-0 lg:max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-mainBg/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-primary shadow-main backdrop-blur transition-transform duration-500 group-hover:-translate-y-1">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_0_4px_rgba(118,171,174,0.18)]" />
            Built for the moving life
          </div>
          <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.04em] text-secondary sm:text-7xl lg:text-8xl">
            Digital services
            <span className="block text-primary">for nomads worldwide</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral sm:text-xl">
            Your ultimate hub for seamless internet connectivity and mobile solutions to expert
            laptop servicing, we ensure you stay productive and worry-free
          </p>
        </div>
      </div>
    </div>
  );
}

export function HeroClipPathGradient() {
  return (
    <div
      className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
      aria-hidden="true"
    >
      <div
        className="hero-gradient-drift aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-primary via-cyan-700 to-amber-300 opacity-25 transition-opacity duration-700 group-hover:opacity-35"
        style={{
          clipPath:
            'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
        }}
      />
    </div>
  );
}
