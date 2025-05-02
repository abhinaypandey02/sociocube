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
    question: "What is Sociocube?",
    answer:
      "Sociocube is the biggest influencer marketing platform that's open for all. It’s the only place where brands and creators can connect with each other completely free. We’ve built powerful AI features like AI search and AI campaign creation to make collaborations smarter and faster. Every creator also gets a personal dashboard with a portfolio builder, link-in-bio tool, and performance insights.",
  },
  {
    question: "Who can join Sociocube?",
    answer:
      "Anyone and everyone! The only requirement for creators is to have a public Instagram account. For brands, not even that is needed. There are no follower count restrictions—just sign up and start connecting.",
  },
  {
    question: "Is Sociocube free to use?",
    answer:
      "Yes—Sociocube is totally free for creators. Brands can also use it for free with full access to basic features. For higher usage levels, a small subscription fee helps support the AI tools, but there’s also a 7-day free trial for premium features. You’ll always be able to get started and collaborate without paying a rupee.",
  },
  {
    question: "How do brands and creators connect on Sociocube?",
    answer:
      "Creators apply to brand campaigns directly from the platform—it’s completely free and only takes one click. No endless forms! On the brand side, our AI Search helps find ideal creators instantly, while AI Campaigns allow brands to post collaboration offers and review full creator profiles to shortlist the best fit.",
  },
  {
    question: "What makes Sociocube different from other influencer platforms?",
    answer:
      "For starters—it's 100% free and open to all. You can get started in under 30 seconds. We have a real, growing community—not just a scraped directory. Brands get full analytics on applicants, and creators enjoy a clean, easy-to-use interface. Oh, and it’s being built from the ground up by two passionate college friends.",
  },
  {
    question: "What kind of AI features does Sociocube offer?",
    answer:
      "Our AI Search lets brands describe what they’re looking for—like “female creators in Delhi with 10k to 30k followers”—and instantly surfaces top matches. AI Campaigns guide brands through setting up a perfect collaboration posting. Plus, our AI Script Generator helps brands and creators craft personalized pitches and scripts effortlessly.",
  },
  {
    question: "How does Sociocube help creators grow?",
    answer:
      "Sociocube gives creators a free, auto-generated portfolio, a personalized link-in-bio tool, and access to detailed statistics about their performance. You can apply to unlimited campaigns, share your portfolio link anywhere, and even get reviews from brands as proof of work. And yes—it’s all completely free.",
  },
  {
    question: "Can creators trust brands on Sociocube?",
    answer:
      "Sociocube is an open platform that helps people connect. We do show a verification badge for Instagram-verified users, but we don’t do deeper verification beyond that. We believe in giving everyone a chance—but it’s up to creators to do their due diligence before entering collaborations.",
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
