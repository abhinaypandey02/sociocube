import React from "react";
import { notFound } from "next/navigation";
import { getSEO } from "../../constants/seo";
import { getCurrentUser } from "../../lib/apollo-server";
import AddUserForm from "./add-user-form";

export default async function SearchPage() {
  const { user } = await getCurrentUser();
  if (user?.email !== "admin@freeluencers.com") return notFound();
  return (
    <section className="mt-5  flex flex-1 flex-col justify-center pb-12 sm:px-6 sm:py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full ">
        <h2 className="mt-6 text-center font-poppins text-3xl font-bold leading-9 text-gray-800 sm:text-5xl ">
          Add user
        </h2>
      </div>

      <div className="sm:mx-auto sm:mt-20 sm:w-full sm:max-w-[480px]">
        <div className=" px-6 py-12 sm:rounded-lg sm:bg-white sm:px-12 sm:shadow">
          <AddUserForm />
        </div>
      </div>
    </section>
  );
}
export const metadata = getSEO("Find influencers");
