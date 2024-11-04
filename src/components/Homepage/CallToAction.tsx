"use client";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";

export function CallToAction() {
  const { user } = useAppSelector((state) => state.user);
  const { push } = useRouter();

  return (
    <div>
      <div className='text-center bg-nomadGray py-12 xl:px-12 px-4 rounded'>
        <h1 className='text-2xl text-secondary font-semibold'>
          Ready to Elevate Your Nomadic Lifestyle?
        </h1>
        <p className='text-neutral mt-2 max-w-2xl mx-auto mb-6'>
          Join Nomad Horizon today and unlock essential services to stay
          connected, productive, and on the move wherever your journey takes
          you.
        </p>
        <Button
          variant='solid'
          onClick={() => push(user.accessToken ? "/services" : "/register")}
        >
          {user.accessToken ? (
            <span>Explore Services</span>
          ) : (
            <span>Register Now</span>
          )}
        </Button>
      </div>
    </div>
  );
}
