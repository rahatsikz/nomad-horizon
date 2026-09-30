import React from "react";
import LoadingComponent from "@/components/ui/LoadingComponent";

export default function Loading() {
  return (
    <section className='flex min-h-screen items-center justify-center bg-canvas'>
      <LoadingComponent />
    </section>
  );
}
