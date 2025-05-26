"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Minus, Plus } from "@phosphor-icons/react/dist/ssr";
import dynamic from "next/dynamic";
import React from "react";

import Schema from "./schema";
import SectionWrapper from "./section-wrapper";

const faqs = [
  {
    question: "How do brands find UGC creators online?",
    answer:
      "Brands typically find UGC creators using creator discovery platforms like Sociocube, where they can filter by niche, location, followers, and engagement rate. Some also use social media search tools or influencer databases, but platforms with built-in campaign tools offer a faster and more reliable way to connect.",
  },
  {
    question: "What is the best way to earn money as a content creator?",
    answer:
      "The best way to earn money as a content creator is by joining UGC and influencer marketing platforms that post active campaigns from brands. These platforms let you apply for paid collaborations, create UGC for products, and even negotiate long-term deals without needing an agency.",
  },
  {
    question: "What is a UGC campaign?",
    answer:
      "A UGC campaign is a type of marketing campaign where brands invite content creators to produce user-generated content, such as videos, photos, or reviews. These campaigns are often run on platforms like Sociocube, and are designed to drive trust and engagement on social media.",
  },
  {
    question: "Where can I find UGC campaigns to join?",
    answer:
      "You can find UGC campaigns to join on platforms like Sociocube, where brands post open collaboration opportunities for creators. These campaigns often include paid offers, product gifting, and content guidelines for Instagram, TikTok, or YouTube.",
  },
  {
    question: "Do you need followers to get brand deals?",
    answer:
      "No, you don't always need a huge following to get brand deals. Many brands now work with micro and nano influencers because of their higher engagement rates. UGC-focused platforms often prioritize content quality and niche relevance over follower count.",
  },
  {
    question: "How do influencer marketing campaigns work?",
    answer:
      "Influencer marketing campaigns typically involve a brand creating a campaign with specific goals, such as product promotion or awareness. Creators apply or are invited to participate, and once selected, they post the agreed content to their audience. Platforms like Sociocube simplify this entire process by handling discovery, applications, and communication.",
  },
  {
    question: "What is the difference between UGC creators and influencers?",
    answer:
      "UGC creators specialize in creating content for brands to use in their ads or social pages—they don’t always need to post it themselves. Influencers, on the other hand, promote content to their own audience. Some platforms support both types, offering flexible opportunities for creators to earn.",
  },
  {
    question: "Are UGC platforms better than influencer agencies?",
    answer:
      "UGC platforms are often better for both brands and creators who want speed, transparency, and affordability. Unlike agencies, platforms like Sociocube don’t take commissions or gatekeep access—they allow anyone to post or apply directly with clear terms.",
  },
];
function Faqs() {
  return (
    <SectionWrapper
      headerClassName="mb-6!"
      id="faq"
      title="Frequently asked questions"
    >
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
      <dl className="space-y-6 divide-y divide-gray-800/10">
        {faqs.map((faq, i) => (
          <Disclosure
            as="div"
            className="py-6"
            key={faq.question + i.toString()}
          >
            {({ open }) => (
              <>
                <dt>
                  <DisclosureButton className="flex w-full items-start pb-2 justify-between text-left text-gray-900">
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
    </SectionWrapper>
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
