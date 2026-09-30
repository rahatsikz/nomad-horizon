import Image from 'next/image';
import { HeaderText } from '../../../components/ui/Headers';

export function Overview() {
  return (
    <section className="relative">
      <HeaderText
        title="Overview"
        subtitle="Focus on your adventures and career without the worry of losing connectivity or facing tech issues"
      />
      <div className="relative overflow-hidden bg-nomadGray rounded-2xl shadow-main">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(118,171,174,0.12),transparent_42%),linear-gradient(315deg,rgba(34,40,49,0.08),transparent_55%)]" />
        <div className="relative grid lg:grid-cols-[1.08fr_0.92fr]">
          <div className="group relative min-h-[24rem] overflow-hidden lg:min-h-[34rem]">
            <Image
              src="https://images.pexels.com/photos/17767273/pexels-photo-17767273/free-photo-of-man-sitting-with-laptop-on-wooden-bench-on-meadow-under-tree.jpeg"
              alt="Remote worker using a laptop outdoors"
              width={1200}
              height={900}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="absolute inset-0 h-full w-full origin-center transform-gpu object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/5 to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-white sm:bottom-8 sm:left-8">
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_0_5px_rgba(118,171,174,0.25)]" />
              Work without borders
            </div>
          </div>

          <div className="relative flex flex-col justify-between gap-10 bg-nomadGray p-7 sm:p-10 lg:p-12">
            <div className="absolute right-0 top-0 h-40 w-40 bg-[radial-gradient(circle_at_top_right,rgba(118,171,174,0.45),transparent_68%)]" />
            <div className="relative">
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.28em] text-primary">
                The Nomad Horizon standard
              </p>
              <h3 className="max-w-md text-3xl font-bold leading-[1.05] sm:text-5xl">
                Your workday should travel as well as you do.
              </h3>
            </div>
            <div className="relative space-y-6 text-base leading-relaxed text-neutral sm:text-lg">
              <p>
                We keep nomads and remote teams connected, productive, and ready for whatever comes
                next. From dependable internet to quick device support, the essentials stay within
                reach.
              </p>
              <div className="grid grid-cols-2 gap-4 border-t dark:border-white/15 border-slate-600/20 pt-6">
                {overviewStats.map((stat) => (
                  <OverviewStat key={stat.label} {...stat} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OverviewStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-bold text-secondary sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-widest text-neutral">{label}</p>
    </div>
  );
}

const overviewStats = [
  { value: '24/7', label: 'Support mindset' },
  { value: '1', label: 'Connected mission' },
];
