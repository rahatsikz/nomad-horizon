import React from "react";
import BookingPageContent from "./BookingPageContent";

const BookingPage = ({ params }: { params: { id: string } }) => {
  return <BookingPageContent id={params.id} />;
};

export default BookingPage;
