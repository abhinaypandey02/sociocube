"use client";
import { ArrowSquareOut, Check } from "@phosphor-icons/react/dist/ssr";
import React from "react";

import { Button } from "@/components/button";
import { useSubscription } from "@/lib/auth-client";
import { MaxUsages, SearchResultsLength } from "@/lib/usages";

import Modal from "../../../components/modal";

const FEATURES = [
  `${MaxUsages.AiSearch.Plus} AI searches per day`,
  `${SearchResultsLength.Plus} results per search`,
  `${MaxUsages.GlobalAnnouncement.Plus} announcements per day`,
  `${MaxUsages.PostingAnnouncement.Plus} announcements for each posting`,
  "View email and phone of applicants",
  "View advanced stats like reach, ER, avg likes",
  "View recommendations for each posting and shortlist",
  "Download data as excel",
];

export default function GetSubscriptionModal({
  close,
  message,
}: {
  close: () => void;
  message?: string;
}) {
  const [sub] = useSubscription();
  return (
    <Modal title={"Get Sociocube plus"} close={close} open={!!message}>
      <p className=" text-center italic text-primary mt-4 font-medium">
        {message}
      </p>
      {!sub?.existing.plan && (
        <div className="space-y-6 mt-9">
          <ul className="space-y-2 text-sm text-gray-700">
            {FEATURES.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="text-primary" weight="bold" />
                {item}
              </li>
            ))}
          </ul>
          {sub?.link && (
            <a href={sub.link}>
              <Button className="mx-auto flex items-center gap-2">
                Start 3-day free trial <ArrowSquareOut weight="bold" />
              </Button>
            </a>
          )}
        </div>
      )}
    </Modal>
  );
}
