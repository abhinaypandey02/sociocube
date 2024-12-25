"use client";
import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Minus, Plus } from "@phosphor-icons/react/dist/ssr";
import dynamic from "next/dynamic";
import Schema from "./schema";

const faqs = [
  {
    question: "What is this platform for?",
    answer:
      "Our platform connects brands with influencers, making it easy to find, communicate, and collaborate on posts, stories, reels, and more. We simplify the process of finding influencers that align with your brand’s goals.",
  },
  {
    question: "How do I find influencers on this platform?",
    answer:
      "You can search for influencers using filters like age, gender, follower count, category, location, and starting price. Each influencer has a detailed profile showcasing their reach, engagement, and Instagram posts to help you make informed decisions.",
  },
  {
    question: "Is this platform free to use?",
    answer:
      "Yes, all features on our platform are completely free for both brands and influencers.",
  },
  {
    question: "How can I contact influencers?",
    answer:
      "You can chat with influencers directly through our portal once you find a profile you’re interested in. Just click on the chat option on the influencer’s profile to start a conversation.",
  },
  {
    question: "How do influencers join the platform?",
    answer:
      "Influencers can join through a simple onboarding process where they connect their Instagram account and provide some basic details. This process ensures that all influencer profiles are authentic and up-to-date.",
  },
  {
    question: "Can I see an influencer's Instagram content on their profile?",
    answer:
      "Yes, each influencer’s profile displays a preview of their Instagram posts, along with details like reach, follower count, and engagement to help you get a better sense of their content style and audience.",
  },
  {
    question: "What types of collaborations can I request?",
    answer:
      "Brands can collaborate with influencers on various types of content, including Instagram stories, posts, reels, and more. Specific collaboration options will vary depending on each influencer’s offerings.",
  },
  {
    question: "Is there any cost to connect with an influencer?",
    answer:
      "Our platform does not charge any fees for connecting or chatting with influencers. However, any fees or costs related to the collaboration itself are between the brand and the influencer.",
  },
  {
    question: "Can I cancel a collaboration?",
    answer:
      "Any agreements or collaborations are arranged directly between brands and influencers. We recommend clarifying terms before confirming a collaboration. For further assistance, please contact our support team.",
  },
  {
    question: "How can I ensure a successful collaboration?",
    answer:
      "We encourage brands to communicate clearly with influencers and discuss their expectations in detail before starting any collaboration. Our platform also provides insights into each influencer's engagement and content style to help you choose the best fit for your brand.",
  },
];
function Faqs() {
  return (
    <div className="mx-auto  max-w-7xl px-6  py-16 sm:my-16 lg:px-8" id="faq">
      <div className="mx-auto  divide-y divide-gray-900/10">
        <h2 className="font-poppins text-3xl font-bold leading-10 text-gray-900 sm:text-4xl">
          Frequently asked questions
        </h2>
        <Schema
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }}
          id="faqs"
        />
        <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
          {faqs.map((faq, i) => (
            <Disclosure
              as="div"
              className="pt-6"
              key={faq.question + i.toString()}
            >
              {({ open }) => (
                <>
                  <dt>
                    <DisclosureButton className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-lg font-semibold leading-7">
                        {faq.question}
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <Minus aria-hidden="true" className="size-6" />
                        ) : (
                          <Plus aria-hidden="true" className="size-6" />
                        )}
                      </span>
                    </DisclosureButton>
                  </dt>
                  <DisclosurePanel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600">
                      {faq.answer}
                    </p>
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Faqs), {
  loading: () => (
    <Schema
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
      id="faqs"
    />
  ),
});
