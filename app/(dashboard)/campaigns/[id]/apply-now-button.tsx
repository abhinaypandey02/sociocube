"use client";
import { ArrowSquareOut, ShareNetwork } from "@phosphor-icons/react";
import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Eligibility, GetAllPostingsQuery } from "@/__generated__/graphql";
import { Button } from "@/components/button";
import { Variants } from "@/components/constants";
import Form from "@/components/form";
import { IconButton } from "@/components/icon-button";
import { Input } from "@/components/input";
import { getRoute, Route } from "@/constants/routes";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { useToken } from "@/lib/auth-client";
import { APPLY_NOW } from "@/lib/mutations";

import LinkWrapper from "../../../../components/link-wrapper";
import Modal from "../../../../components/modal";
import { getShareText } from "./utils";

const BUTTON_MESSAGE = {
  [Eligibility.Unauthorized]: "Sign in to apply",
  [Eligibility.NotAgeGroup]: "Not your age group",
  [Eligibility.Eligible]: "Apply now",
  [Eligibility.Closed]: "Campaign over",
  [Eligibility.LessFollowers]: "Not enough followers",
  [Eligibility.NotOnboarded]: "Onboard to apply",
  [Eligibility.NotCreator]: "Only creators can apply",
  [Eligibility.GenderMismatch]: "Not for your gender",
  [Eligibility.LocationMismatch]: "Not for your location",
};

interface FormType {
  comment?: string;
}

export default function ApplyNowButton({
  posting,
}: {
  posting: GetAllPostingsQuery["postings"][number];
}) {
  const form = useForm<FormType>();
  const [appliedSuccess, setAppliedSuccess] = useState(
    Boolean(posting.hasApplied),
  );
  const token = useToken();
  const [applyNow, { loading: applyNowLoading }] = useAuthMutation(APPLY_NOW);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRouteLoading, setIsRouteLoading] = useState(false);

  const buttonURL = useMemo(() => {
    if (posting.eligibility === Eligibility.Unauthorized)
      return `${getRoute("SignUp")}?redirectURL=${Route.Campaigns}/${posting.id}`;
    if (posting.eligibility === Eligibility.NotOnboarded)
      return `${getRoute("Onboarding")}?redirectURL=${Route.Campaigns}/${posting.id}`;
  }, [posting]);

  const handleClose = () => {
    setIsModalOpen(false);
  };
  const openExternalLink = () => {
    if (posting.externalLink) window.open(posting.externalLink, "_blank");
  };
  const handleClick = useCallback(() => {
    if (appliedSuccess) {
      openExternalLink();
      return;
    }
    if (buttonURL) {
      setIsRouteLoading(true);
    } else {
      if (!posting.externalLink) setIsModalOpen(true);
      else handleApply({});
    }
  }, [appliedSuccess, buttonURL, token, posting.externalLink]);

  const handleApply = (values: FormType) => {
    openExternalLink();
    if (posting.id) {
      applyNow({
        postingID: posting.id,
        comment: values.comment,
      })
        .then(() => {
          setAppliedSuccess(true);
          setIsModalOpen(false);
        })
        .catch(handleGQLErrors);
    }
  };

  const loading = isRouteLoading || applyNowLoading;
  return (
    <>
      <Modal close={handleClose} open={isModalOpen}>
        <h3 className="mb-6 text-2xl font-semibold text-gray-700">Apply now</h3>
        <h4 className="mb-1 font-poppins font-medium">Campaign title</h4>
        <p className="mb-4 text-sm">{posting.title}</p>
        <Form form={form} onSubmit={form.handleSubmit(handleApply)}>
          {!posting.externalLink ? (
            <Input
              className="mb-4 placeholder:text-xs"
              label={
                posting.extraDetails
                  ? `${posting.extraDetails} *`
                  : "Add comments"
              }
              name="comment"
              placeholder={`${posting.extraDetails ? "" : "(Optional) "}Add a comment to add more information for the recruiter`}
              required={Boolean(posting.extraDetails)}
              rules={{ required: Boolean(posting.extraDetails) }}
              textarea
            />
          ) : null}
          <Button
            className="ml-auto mt-3 px-3! py-1 text-sm"
            loading={loading}
            success={appliedSuccess}
            type="submit"
          >
            {posting.externalLink
              ? appliedSuccess
                ? "Open form"
                : "Apply now"
              : "Send Application"}
          </Button>
        </Form>
      </Modal>

      <LinkWrapper className="max-sm:w-full" href={buttonURL}>
        <Button
          className="w-full flex items-center gap-2"
          disabled={!buttonURL}
          invert={appliedSuccess}
          loading={loading}
          onClick={handleClick}
          variant={Variants.ACCENT}
        >
          {appliedSuccess
            ? posting.externalLink
              ? "Opened"
              : "Applied"
            : BUTTON_MESSAGE[posting.eligibility || Eligibility.Eligible]}
          {posting.externalLink && <ArrowSquareOut />}
        </Button>
      </LinkWrapper>

      <IconButton
        className="max-lg:translate-x-3"
        onClick={() => {
          navigator.clipboard.writeText(getShareText(posting)).then(() => {
            toast.success("Copied to clipboard");
            try {
              void navigator.share({
                text: getShareText(posting),
              });
            } catch {}
          });
        }}
      >
        <ShareNetwork className="text-accent" size={24} weight="duotone" />
      </IconButton>
    </>
  );
}
