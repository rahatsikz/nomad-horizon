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
      <div className='w-full h-full flex items-center justify-center'>
        <p className='text-secondary max-md:py-4'>{isError?.data?.message}</p>
      </div>
    );
  }

  return (
    <>
      <div className='dark:border-neutral border-l md:border-r h-8 ml-14'></div>
      {serviceSchedule.map((item: ScheduleTimeProps, idx: number) => (
        <div key={idx} className='relative w-full'>
          <div className='absolute top-0 left-0 text-secondary'>
            {item.sessionStarts}
          </div>
          <div className='dark:border-neutral border-l md:border-r border-t h-16 ml-14'>
            {item.available ? (
              <div
                className={cn(
                  "text-secondary w-full flex items-center justify-center h-full cursor-pointer",
                  {
                    "bg-primary":
                      selectedTime?.sessionStarts === item.sessionStarts,
                  }
                )}
                onClick={() => onTimeClick(item)}
              >
                Available to book
              </div>
            ) : (
              <div className='text-neutral cursor-not-allowed w-full flex items-center justify-center h-full'>
                Not Available to Book
              </div>
            )}
          </div>
        </div>
      ))}
      <div className='dark:border-neutral border-t border-l md:border-r h-8 ml-14'></div>
    </>
  );
};
