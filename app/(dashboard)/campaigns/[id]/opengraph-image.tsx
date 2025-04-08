import { queryGQL } from "@/lib/apollo-server";
import { GET_POSTING } from "@/lib/queries";
import { getOgImage } from "@/lib/util-components";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = parseInt((await params).id);
  const { posting } = await queryGQL(
    GET_POSTING,
    {
      id,
    },
    undefined,
    120,
    ["posting"],
  );
  return getOgImage(
    posting?.title || "Find collaboration opportunities",
    "Apply now",
    `Collaboration opportunity by ${posting?.agency.name}`,
    posting?.agency.photo || undefined,
  );
}
