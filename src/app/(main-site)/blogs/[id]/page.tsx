import React from "react";
import SoloBlogContent from "./SoloBlogContent";

export default async function SoloBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SoloBlogContent id={id} />;
}
