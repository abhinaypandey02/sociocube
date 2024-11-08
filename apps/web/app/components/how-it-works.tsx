import React from "react";
import Image from "next/image";

const timeline = [
  {
    name: "Influencers Join the Platform",
    image: "/how-it-works-1.svg",
    description:
      "Influencers complete a simple onboarding process, connecting their Instagram account and providing essential details. This makes sure every profile is authentic and up-to-date.",
  },
  {
    name: "Brands Search for Influencers",
    image: "/how-it-works-2.svg",
    description:
      "Brands can explore our diverse network of onboarded influencers using advanced filters like age, location, follower count, category, and more to find the perfect match for their campaign.\n",
  },
  {
    name: "Explore Detailed Profiles",
    image: "/how-it-works-3.svg",
    description:
      "Each influencer profile provides insights such as recent Instagram posts, follower reach, engagement levels, location, and other key details to help brands make informed decisions.",
  },
  {
    name: "Connect and Collaborate",
    image: "/how-it-works-4.svg",
    description:
      "Brands can reach out to influencers directly through Instagram or by using our in-platform chat. Start a conversation, discuss ideas, and set up collaborations that help your brand grow.",
  },
];
export default function HowItWorks() {
  return (
    <div className=" py-16 sm:my-16" id="how-it-works">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto  lg:mx-0">
          <h2 className="font-poppins text-3xl font-bold  sm:text-4xl">
            Effortless Connections, Powerful Collaborations
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-800">
            See how Freeluencers brings brands and influencers together for
            authentic partnerships—from onboarding to seamless communication.
          </p>
        </div>
        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {timeline.map((item, i) => (
            <div key={item.name}>
              <Image
                alt={item.name}
                className="mb-10 h-28"
                height={200}
                src={item.image}
                width={200}
              />
              <h4 className="flex items-center text-sm font-semibold leading-6 text-accent">
                <svg
                  aria-hidden="true"
                  className="mr-4 size-1 flex-none"
                  viewBox="0 0 4 4"
                >
                  <circle cx={2} cy={2} fill="currentColor" r={2} />
                </svg>
                Step {i + 1}
                <div
                  aria-hidden="true"
                  className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                />
              </h4>
              <p className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                {item.name}
              </p>
              <p className="mt-1 text-base leading-7 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
