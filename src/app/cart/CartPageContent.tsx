"use client";
import { Button } from "@/components/ui/Button";
import { HeaderText } from "@/components/ui/Headers";
import { dummyServices } from "@/constant/global";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCart } from "@/redux/slice/cart/cartSlice";
import { ServiceProps } from "@/types/common";
import React from "react";

export default function CartPageContent() {
  const { cart } = useAppSelector((state) => state.cart);

  if (cart?.length === 0) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <h1 className='text-2xl text-primary'>Your cart is empty</h1>
      </div>
    );
  }

  const cartItem = cart?.map((item) =>
    dummyServices.find((data) => data?.id === item)
  );

  return (
    <section className='container mx-auto px-4 2xl:px-0 py-8'>
      <HeaderText title='Your Cart' subtitle='Ready to complete your order?' />
      <div className='space-y-4'>
        {cartItem?.map((data) => (
          <CartCard key={data?.id} data={data} />
        ))}
      </div>
    </section>
  );
}

const CartCard = ({ data }: { data: ServiceProps | undefined }) => {
  const dispatch = useAppDispatch();

  return (
    <div className='flex flex-col md:flex-row justify-between gap-3 px-6 py-8 bg-nomadGray rounded-md border border-secondary'>
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
          onClick={() => dispatch(removeFromCart(data?.id as string))}
        >
          Remove
        </Button>
        <Button variant='solid'>Book Now</Button>
      </div>
    </div>
  );
};