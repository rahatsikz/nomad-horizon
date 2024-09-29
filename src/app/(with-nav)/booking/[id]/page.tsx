import React from "react";
import BookingPageContent from "./BookingPageContent";

export default function BookingPage({ params }: { params: { id: string } }) {
  return <BookingPageContent id={params.id} />;
}
