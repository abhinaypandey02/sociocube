import { Check } from "@phosphor-icons/react/dist/ssr";

import SectionWrapper from "./section-wrapper";

const features = [
  {
    name: "Location",
    description:
      "Search by geographic area to find influencers with local relevance for your brand’s audience.",
  },
  {
    name: "Gender",
    description:
      "Filter by gender to ensure your campaigns resonate with the right demographics. We are inclusive of all genders <3",
  },
  {
    name: "Categories",
    description:
      "Choose from various categories like Fashion, Travel, etc to find influencers who specialize in your brand’s niche.",
  },
  {
    name: "Price",
    description:
      "Adjust your search by starting price to collaborate with influencers at a price within your budget range.",
  },
  {
    name: "Followers & Reach",
    description:
      "Select influencers based on follower count and reach to match your brand’s desired reach and engagement.",
  },
  {
    name: "Age",
    description:
      "Find influencers with minimum and maximum age ranges to appeal to your target audience effectively.",
  },
];

export default function FiltersList() {
  return (
    <SectionWrapper
      className="grid grid-cols-1 gap-x-8  sm:gap-y-20 lg:grid-cols-3"
      description="Effortlessly refine your search to find influencers who align with your brand’s goals. Our diverse set of filters allows you to pinpoint the perfect partners based on specific needs and criteria."
      id="filters"
      prefixTitle="Precise discovery"
      title="Find Your Perfect Match with Advanced Search Filters"
    >
      <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-16">
        {features.map((feature) => (
          <div className="relative pl-9" key={feature.name}>
            <dt className="font-poppins font-semibold text-gray-900">
              <Check
                aria-hidden="true"
                className="absolute left-0 top-1 size-5 text-accent"
              />
              {feature.name}
            </dt>
            <dd className="mt-2">{feature.description}</dd>
          </div>
        ))}
      </dl>
    </SectionWrapper>
  );
}
