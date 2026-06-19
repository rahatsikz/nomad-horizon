import React from "react";
import ServiceDetailsContent from "./ServiceDetailsContent";

export default async function ServiceDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log(id);
  return <ServiceDetailsContent id={id} />;
}
