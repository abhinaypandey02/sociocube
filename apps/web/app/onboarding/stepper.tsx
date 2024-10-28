"use client";
import React from "react";
import { useSuspenseQuery } from "@apollo/client";
import { GET_DEFAULT_ONBOARDING_DETAILS } from "../../lib/queries";
import { getStep } from "./onboarding-wizard";

export default function OnboardingStepper({
  steps,
}: {
  steps: { title: string; description: string }[];
}) {
  const {
    data: { getCurrentUser: currentUser },
  } = useSuspenseQuery(GET_DEFAULT_ONBOARDING_DETAILS);
  const selected = getStep(currentUser);
  return (
    <ol className="relative border-s border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400">
      {steps.map((step, i) => (
        <li className="mb-10 ms-6" key={i}>
          {i < selected && (
            <span className="absolute -start-4 flex size-8 items-center justify-center rounded-full bg-green-200 ring-4 ring-white dark:bg-green-900 dark:ring-gray-900">
              <svg
                aria-hidden="true"
                className="size-3.5 text-green-500 dark:text-green-400"
                fill="none"
                viewBox="0 0 16 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.917 5.724 10.5 15 1.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </span>
          )}
          {i > selected && (
            <span className="absolute -start-4 flex size-8 items-center justify-center rounded-full bg-gray-100 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900">
              <svg
                aria-hidden="true"
                className="size-3.5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
              </svg>
            </span>
          )}
          <h3 className="font-medium leading-tight">{step.title}</h3>
          <p className="text-sm">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
