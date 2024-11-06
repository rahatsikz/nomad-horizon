import React from "react";
import ServiceDetailsContent from "./ServiceDetailsContent";

export default function ServiceDetails({ params }: { params: { id: string } }) {
  return <ServiceDetailsContent id={params.id} />;
}
