import React from "react";
import SoloBlogContent from "./SoloBlogContent";

export default function SoloBlogPage({ params }: { params: { id: string } }) {
  return <SoloBlogContent id={params.id} />;
}
