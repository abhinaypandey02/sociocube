const stats = [
  { label: "Hassle to search", value: "0%" },
  { label: "Free of cost", value: "100%" },
  { label: "Growth & Collaboration", value: "200%" },
];

export default function AboutUs() {
  return (
    <div className=" py-16 sm:my-16" id="about-us">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            About Us
          </h2>
          <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
              <p className="text-justify text-xl leading-8 text-gray-600">
                At Freeluencers, we connect brands and influencers to create
                authentic collaborations. Our platform simplifies influencer
                marketing, making it easy for brands to engage their audience
                and for influencers to find meaningful partnerships.
              </p>
              <p className="mt-10 text-justify text-base leading-7 text-gray-700">
                Our mission is to empower both influencers and brands by
                providing a user-friendly platform for seamless connections and
                collaborations. We prioritize transparency and authenticity,
                allowing influencers to showcase their unique styles while
                helping brands find the perfect voices to amplify their
                messages. Join us at Freeluencers as we transform the way
                influencers and brands work together, creating a more
                collaborative future in the influencer economy.
              </p>
            </div>
            <div className="lg:flex lg:flex-auto lg:justify-center">
              <dl className="w-64 space-y-8 xl:w-80">
                {stats.map((stat) => (
                  <div
                    className="flex flex-col-reverse gap-y-4"
                    key={stat.label}
                  >
                    <dt className="text-base leading-7 text-gray-600">
                      {stat.label}
                    </dt>
                    <dd className="text-5xl font-semibold tracking-tight text-gray-900">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
