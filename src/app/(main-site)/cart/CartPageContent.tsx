"use client";
import EmptyCart from "@/assets/svgs/empty-cart";
import { Button } from "@/components/ui/Button";
import { HeaderText } from "@/components/ui/Headers";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { useLoggedUserInfo } from "@/hooks/useLoggedUser";
import { useGetServicesQuery } from "@/redux/api/serviceApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCart } from "@/redux/slice/cart/cartSlice";
import { ServiceProps } from "@/types/common";
import { useRouter } from "next/navigation";
import React from "react";

export default function CartPageContent() {
  const { cart } = useAppSelector((state) => state.cart);
  const { data: serviceData, isLoading } = useGetServicesQuery({});

  const { user } = useAppSelector((state) => state.user);
  const { accessToken } = user;
  const { user: loggedUser } = useLoggedUserInfo(accessToken);

  if (cart.filter((item) => item.user === loggedUser?.data?.id)?.length === 0) {
    return (
      <div className='flex h-96 items-center justify-center flex-col gap-6 py-8'>
        <EmptyCart />
        <h1 className='text-2xl text-primary'>Your cart is empty</h1>
      </div>
    );
  }

  const cartItem = cart
    ?.map((item) =>
      serviceData?.data?.data?.find(
        (data: any) =>
          data?.id === item.service && loggedUser?.data?.id === item.user
      )
    )
    .filter(Boolean);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <section className='container mx-auto px-4 2xl:px-0 py-8'>
      <HeaderText title='Your Cart' subtitle='Ready to complete your order?' />
      <div className='space-y-4'>
        {cartItem?.map((data) => (
          <CartCard key={data?.id} data={data} loggedUser={loggedUser} />
        ))}
      </div>
    </section>
  );
}

const CartCard = ({
  data,
  loggedUser,
}: {
  data: ServiceProps | undefined;
  loggedUser: any;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div className='flex flex-col md:flex-row justify-between gap-3 px-6 py-8 bg-nomadGray rounded-md border dark:border-neutral'>
      <div className='text-secondary space-y-2'>
        <p>
          Service Name:{" "}
          <span className='text-primary'>{data?.serviceName}</span>
        </p>
        <p className='text-sm'>
          Price: <span className='text-primary'>{data?.price} USD</span>
        </p>
      </div>
      <div className='space-x-3'>
        <Button
          variant='outline'
          className='border-red-400 text-red-400 hover:text-white hover:bg-red-400'
          onClick={() =>
            dispatch(
              removeFromCart({
                user: loggedUser?.data?.id,
                service: data?.id as string,
              })
            )
          }
        >
          Remove
        </Button>
        <Button
          variant='solid'
          onClick={() => router.push(`/booking/${data?.id}`)}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};
