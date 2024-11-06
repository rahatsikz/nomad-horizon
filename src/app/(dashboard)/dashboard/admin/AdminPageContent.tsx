"use client";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { useLoggedUserInfo } from "@/hooks/useLoggedUser";
import { useAppSelector } from "@/redux/hooks";
import BookingByServiceChart from "./BookingByServiceChart";
import BookingByDaysChart from "./BookingByDaysChart";

export default function AdminPageContent() {
  const { user } = useAppSelector((state) => state.user);
  const { accessToken } = user;

  const { username, isFetching } = useLoggedUserInfo(accessToken);

  if (isFetching) {
    return <LoadingComponent />;
  }

  return (
    <section className='h-full px-6 py-4 lg:py-2'>
      <div className='flex justify-center w-full items-center mb-8'>
        <h2 className='text-3xl text-secondary w-full text-center'>
          Welcome <span className='text-primary'>{username}</span>, This is your
          dashboard
        </h2>
      </div>
      {/*charts  */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-5'>
        <BookingByServiceChart />
        <BookingByDaysChart />
      </div>
    </section>
  );
}
