"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Button, Variants } from "ui/button";
import { useRouter } from "next/navigation";
import { Input } from "ui/input";
import Form from "ui/form";
import { useForm } from "react-hook-form";
import { getAge } from "commons/age";
import type {
  GetCurrentUserApplicationStatusQuery,
  GetPostingQuery,
} from "../../../__generated__/graphql";
import { getRoute } from "../../../constants/routes";
import Modal from "../../../components/modal";
import { handleGQLErrors, useAuthMutation } from "../../../lib/apollo-client";
import { APPLY_NOW } from "../../../lib/mutations";

interface FormType {
  email: string;
  comment?: string;
}

export default function ApplyNowButton({
  data,
  loading: dataLoading,
  isOpen,
  posting,
}: {
  data?: GetCurrentUserApplicationStatusQuery;
  loading: boolean;
  isOpen: boolean;
  posting: GetPostingQuery["posting"];
}) {
  const form = useForm<FormType>();
  const [appliedSuccess, setAppliedSuccess] = useState(
    Boolean(data?.hasApplied),
  );
  const [applyNow, { loading: applyNowLoading }] = useAuthMutation(APPLY_NOW);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const message = useMemo(() => {
    if (appliedSuccess) return ["Applied!", null, "true"];
    if (!isOpen) return ["Closed", null, "true"];
    if (!data?.user) return ["Sign in to apply", getRoute("SignUp")];
    if (!data.user.isOnboarded)
      return ["Onboard to apply", getRoute("Onboarding")];

    if (
      (data.user.instagramStats?.followers || 0) <
      (posting?.minimumInstagramFollower || 0)
    )
      return ["Not enough followers", null, "true"];
    if (!data.user.dob) return ["Add your DOB to apply", null, "true"];
    const age = getAge(new Date(data.user.dob));
    if (age < (posting?.minimumAge || 0) || age > (posting?.maximumAge || 1000))
      return ["Not your age group", null];
    return ["Apply Now", null];
  }, [appliedSuccess, isOpen, data?.user, posting?.minimumInstagramFollower]);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleClick = useCallback(() => {
    if (message[1]) {
      setIsRouteLoading(true);
      router.push(message[1]);
    } else setIsModalOpen(true);
  }, [message]);

  const handleApply = (values: FormType) => {
    if (posting?.id)
      applyNow({
        email: values.email,
        postingID: posting.id,
        comment: values.comment,
      })
        .then(() => {
          setAppliedSuccess(true);
          setIsModalOpen(false);
        })
        .catch(handleGQLErrors);
  };

  const loading = isRouteLoading || dataLoading || applyNowLoading;
  return (
    <>
      <Modal close={handleClose} open={isModalOpen}>
        <h3 className="mb-6 font-poppins text-xl font-semibold">Apply now</h3>
        <h4 className="mb-1 font-poppins font-medium">Applying for</h4>
        <p className="mb-4 text-sm">{posting?.title}</p>
        <h4 className="mb-1 font-poppins font-medium">Applying as</h4>
        <p className="mb-4 text-sm">{data?.user?.name}</p>
        <Form form={form} onSubmit={form.handleSubmit(handleApply)}>
          <Input
            className="mb-4"
            label="Contact email"
            name="email"
            placeholder="Email for the recruiter to reach out to you"
            required
            type="email"
          />
          <Input
            className="mb-4"
            label="Add comment (Optional)"
            name="comment"
            placeholder="Add a comment to add more information for the recruiter"
            textarea
          />
          <Button
            className="mt-3 !px-3 py-1 text-sm"
            loading={loading}
            success={appliedSuccess}
            type="submit"
          >
            Send application
          </Button>
        </Form>
      </Modal>
      <Button
        className="max-sm:w-full sm:ml-auto"
        disabled={Boolean(message[2])}
        loading={loading}
        onClick={handleClick}
        outline={Boolean(message[2])}
        variant={Variants.ACCENT}
      >
        {message[0]}
      </Button>
    </>
  );
}
