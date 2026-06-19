import React from "react";
import BookingPageContent from "./BookingPageContent";

const BookingPage = async({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <BookingPageContent id={id} />;
};

export default BookingPage;
