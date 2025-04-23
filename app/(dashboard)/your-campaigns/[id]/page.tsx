import { notFound } from "next/navigation";
import React from "react";

import { queryGQL } from "@/lib/apollo-server";
import { GET_POSTING } from "@/lib/queries";

import CreateNewPostingForm from "../components/form";

export default async function CreateNewPostingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericID = parseInt(id);
  const { posting } = await queryGQL(
    GET_POSTING,
    { id: numericID },
    undefined,
    0,
  );
  if (!posting) return notFound();
  return (
    <div className="max-w-2xl">
      <CreateNewPostingForm existingPosting={posting} />
    </div>
  );
}
