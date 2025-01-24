"use client";
import type { PropsWithChildren, ReactNode } from "react";
import React, { useCallback, useMemo, useState } from "react";
import { Button, Variants } from "ui/button";
import { Input } from "ui/input";
import Form from "ui/form";
import { useForm } from "react-hook-form";
import { getAge } from "commons/age";
import Link from "next/link";
import type {
  GetCurrentUserApplicationStatusQuery,
  GetPostingQuery,
} from "../../../__generated__/graphql";
import { getRoute, Route } from "../../../constants/routes";
import Modal from "../../../components/modal";
import { handleGQLErrors, useAuthMutation } from "../../../lib/apollo-client";
import { APPLY_NOW } from "../../../lib/mutations";

interface FormType {
  email: string;
  comment?: string;
}

function LinkWrapper({
  url,
  children,
}: PropsWithChildren<{ url?: string | null }>) {
  if (!url) return children;
  return (
    <Link className="max-sm:w-full" href={url}>
      {children}
    </Link>
  );
}

export default function ApplyNowButton({
  data,
  loading: dataLoading,
  posting,
}: {
  data?: GetCurrentUserApplicationStatusQuery;
  loading: boolean;
  posting: GetPostingQuery["posting"];
}) {
  const form = useForm<FormType>({
    defaultValues: {
      email: data?.user?.contactEmail || data?.user?.email || "",
    },
  });
  const [appliedSuccess, setAppliedSuccess] = useState(
    Boolean(data?.hasApplied),
  );
  const [applyNow, { loading: applyNowLoading }] = useAuthMutation(APPLY_NOW);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const message: [ReactNode, string | null, boolean] = useMemo(() => {
    if (appliedSuccess && !posting?.externalLink)
      return ["Applied!", null, true];
    if (!posting?.open) return ["Closed", null, true];
    if (!data?.user)
      return [
        "Sign in to apply",
        `${getRoute("SignUp")}?redirectURL=${Route.Postings}/${posting.id}`,
        false,
      ];

    if (!data.user.isOnboarded)
      return [
        "Onboard to apply",
        `${getRoute("Onboarding")}?redirectURL=${Route.Postings}/${posting.id}`,
        false,
      ];
    if (
      (data.user.instagramStats?.followers || 0) <
      (posting.minimumFollowers || 0)
    )
      return ["Not enough followers", null, true];
    if (!data.user.dob)
      return ["Add your DOB to apply", getRoute("Account"), false];
    const age = getAge(new Date(data.user.dob));
    if (age < (posting.minimumAge || 0) || age > (posting.maximumAge || 1000))
      return ["Not your age group", null, true];
    return ["Apply Now", null, false];
  }, [appliedSuccess, data?.user, posting]);

  const handleClose = () => {
    setIsModalOpen(false);
  };
  const openExternalLink = () => {
    if (posting?.externalLink) window.open(posting.externalLink, "_blank");
  };
  const handleClick = useCallback(() => {
    if (appliedSuccess) {
      openExternalLink();
      return;
    }
    if (message[1]) {
      setIsRouteLoading(true);
    } else setIsModalOpen(true);
  }, [message, posting?.externalLink]);

  const handleApply = (values: FormType) => {
    if (posting?.id) {
      if (appliedSuccess) {
        openExternalLink();
      } else
        applyNow({
          email: values.email.toLowerCase(),
          postingID: posting.id,
          comment: values.comment,
        })
          .then(() => {
            openExternalLink();
            setAppliedSuccess(true);
            setIsModalOpen(false);
          })
          .catch(handleGQLErrors);
    }
  };

  const loading = isRouteLoading || dataLoading || applyNowLoading;
  const editable = posting?.user?.id === data?.user?.id;
  if (editable) return null;
  return (
    <>
      <Modal close={handleClose} open={isModalOpen}>
        <h3 className="mb-6 text-2xl font-bold text-gray-700">Apply now</h3>
        <h4 className="mb-1 font-poppins font-medium">Posting title</h4>
        <p className="mb-4 text-sm">{posting?.title}</p>
        <Form form={form} onSubmit={form.handleSubmit(handleApply)}>
          <Input
            className="mb-4 placeholder:text-xs"
            label="Contact email *"
            name="email"
            placeholder="Email for the recruiter to reach out to you"
            required
          />
          {!posting?.externalLink ? (
            <Input
              className="mb-4 placeholder:text-xs"
              label={
                posting?.extraDetails
                  ? `${posting.extraDetails} *`
                  : "Add comments"
              }
              name="comment"
              placeholder={`${posting?.extraDetails ? "" : "(Optional) "}Add a comment to add more information for the recruiter`}
              required={Boolean(posting?.extraDetails)}
              rules={{ required: Boolean(posting?.extraDetails) }}
              textarea
            />
          ) : null}
          <Button
            className="ml-auto mt-3 !px-3 py-1 text-sm"
            loading={loading}
            success={appliedSuccess}
            type="submit"
          >
            Send Application
          </Button>
        </Form>
      </Modal>
      <LinkWrapper url={message[1]}>
        <Button
          className="w-full"
          disabled={message[2]}
          loading={loading}
          onClick={handleClick}
          outline={message[2]}
          variant={Variants.ACCENT}
        >
          {message[0]}
        </Button>
      </LinkWrapper>
    </>
  );
}
