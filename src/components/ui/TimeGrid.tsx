import { ScheduleTimeProps } from "@/types/common";
import LoadingComponent from "./LoadingComponent";
import { cn } from "@/lib/utils";

export const TimeTable = ({
  onTimeClick,
  selectedTime,
  serviceSchedule,
  isFetching,
  isError,
}: {
  onTimeClick: (time: any) => void;
  selectedTime: ScheduleTimeProps | null;
  serviceSchedule: ScheduleTimeProps[];
  isFetching: boolean;
  isError: any;
}) => {
  // loading while fetching schedule data
  if (isFetching) {
    return <LoadingComponent />;
  }

  // if there is no schedule data
  if (isError?.status === 400) {
    return (
      <div className='flex h-full min-h-60 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-fg/20 p-8 text-center'>
        <p className='nh-label text-amberText'>No sessions</p>
        <p className='max-w-xs text-fgMuted'>{isError?.data?.message}</p>
      </div>
    );
  }

  return (
    <ol className='divide-y divide-fg/10 border-y border-fg/10'>
      {serviceSchedule?.map((item: ScheduleTimeProps, idx: number) => {
        const isSelected = selectedTime?.sessionStarts === item.sessionStarts;
        return (
          <li key={idx} className='grid grid-cols-[4.5rem_1fr] items-stretch gap-4 py-2 sm:grid-cols-[6rem_1fr]'>
            <span className='flex items-center font-display text-lg font-bold tabular-nums text-fg'>
              {item.sessionStarts}
            </span>
            {item.available ? (
              <button
                type='button'
                aria-pressed={isSelected}
                className={cn(
                  "flex min-h-14 items-center justify-between rounded-xl border px-5 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber",
                  isSelected
                    ? "border-amber bg-amber text-onAmber"
                    : "border-fg/15 text-fg hover:border-amber hover:bg-amber/10"
                )}
                onClick={() => onTimeClick(item)}
              >
                <span>
                  {item.sessionStarts} – {item.sessionEnds}
                </span>
                <span className={cn("nh-label", isSelected ? "text-onAmber" : "text-amberText")}>
                  {isSelected ? "Selected" : "Available"}
                </span>
              </button>
            ) : (
              <div className='flex min-h-14 cursor-not-allowed items-center justify-between rounded-xl border border-fg/10 bg-[repeating-linear-gradient(135deg,rgb(var(--nh-fg)/0.04)_0_8px,transparent_8px_16px)] px-5 text-sm text-fgMuted'>
                <span>
                  {item.sessionStarts} – {item.sessionEnds}
                </span>
                <span className='nh-label'>Booked</span>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
};
