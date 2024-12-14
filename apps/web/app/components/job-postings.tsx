import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import type { GetFeaturedSellersQuery } from "../../__generated__/graphql";
import { Route } from "../../constants/routes";

export default function JobPostings({
  postings,
}: {
  postings: GetFeaturedSellersQuery["postings"];
}) {
  return (
    <div className=" py-16 sm:my-16" id="how-it-works">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ul className="divide-y divide-gray-100">
          {postings.map((posting) => (
            <li
              className="relative flex justify-between gap-x-6 py-5"
              key={posting.id}
            >
              <div className="flex min-w-0 gap-x-4">
                {posting.user?.photo ? (
                  <Image
                    alt={posting.user.companyName || ""}
                    className="size-12 flex-none rounded-full bg-gray-50"
                    src={posting.user.photo}
                  />
                ) : null}
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <a href={`${Route.Postings}/${posting.id}`}>
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      {posting.title}
                    </a>
                  </p>
                  <p className="mt-1 line-clamp-1 flex text-xs leading-5 text-gray-500">
                    {posting.user?.companyName} •
                    {` > ${posting.minimumAge} yrs`}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-4">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {posting.barter
                      ? "Barter"
                      : `${posting.currency} ${posting.price}`}
                  </p>
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="size-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">
                      {`${posting.applicationsCount}+ applications`}
                    </p>
                  </div>
                </div>
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 flex-none text-gray-400"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
