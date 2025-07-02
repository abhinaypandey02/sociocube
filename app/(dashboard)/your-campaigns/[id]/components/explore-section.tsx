"use client";

import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

import { Route } from "@/constants/routes";
import { useOpenPopup, useSubscription } from "@/state/hooks";

export default function ExploreRecommendationsLink({
  postingId,
}: {
  postingId: number;
}) {
  const toggleSubscribeModal = useOpenPopup("GET_SUBSCRIPTION");
  const [subscription] = useSubscription();
  const router = useRouter();

  const handleClick = () => {
    if (!subscription?.existing.plan) {
      toggleSubscribeModal("Subscribe for campaign-tailored recommendations.");
    } else {
      router.push(postingId + Route.Explore);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={
        "shadow-md block rounded-xl mb-5 p-5 border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
      }
    >
      <div className={"flex justify-between items-start"}>
        <p className={"text-3xl font-medium font-poppins text-gray-600"}>
          <MagnifyingGlass weight={"bold"} />
        </p>
        <ArrowRight />
      </div>
      <h2 className={"font-poppins mt-3"}>Explore recommendations</h2>
    </div>
  );
}
