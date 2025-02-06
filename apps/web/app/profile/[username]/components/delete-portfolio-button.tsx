"use client";
import React, { useRef, useState } from "react";
import { Button } from "ui/button";
import { Input } from "ui/input";
import { useRouter } from "next/navigation";
import { TrashSimple } from "@phosphor-icons/react/dist/ssr";
import Modal from "../../../../components/modal";
import type { GetSellerQuery } from "../../../../__generated__/graphql";
import {
  handleGQLErrors,
  useAuthMutation,
} from "../../../../lib/apollo-client";
import { DELETE_PORTFOLIO } from "../../../../lib/mutations";
import { revalidateProfilePage } from "../../../../lib/revalidate";

export default function DeletePortfolioButton({
  work,
  username,
}: {
  work: NonNullable<
    NonNullable<GetSellerQuery["getSeller"]>["portfolio"]
  >[number];
  username: string;
}) {
  const [open, setOpen] = useState(false);
  const [deletePortfolio, { data, loading }] =
    useAuthMutation(DELETE_PORTFOLIO);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const onSubmit = async () => {
    await deletePortfolio({
      id: work.id,
    })
      .catch(handleGQLErrors)
      .then(async () => {
        await revalidateProfilePage(username);
        router.refresh();
      });
    setOpen(false);
  };
  return (
    <>
      <Modal
        close={() => {
          setOpen(false);
        }}
        open={open}
      >
        <h3 className="mb-8 font-poppins text-xl font-medium text-gray-800">
          Delete this portfolio work?
        </h3>
        <div className="space-y-5">
          <button
            className="flex w-full items-center justify-center rounded-md border border-dashed border-gray-500 text-gray-500"
            onClick={() => fileRef.current?.click()}
            type="button"
          >
            <img
              alt="new portfolio"
              className="object-cover"
              src={work.imageURL}
            />
          </button>
          {work.caption ? (
            <Input
              disabled
              label="Caption"
              name="caption"
              value={work.caption}
            />
          ) : null}
          {work.link ? (
            <Input
              disabled
              label="Link to this work"
              name="link"
              value={work.link}
            />
          ) : null}
          <Button
            className="w-full"
            loading={loading}
            onClick={onSubmit}
            outline
            success={data?.deletePortfolio}
            type="button"
          >
            Delete portfolio
          </Button>
        </div>
      </Modal>
      <button
        className="absolute right-0 top-0  flex size-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-gray-50 text-red-500 shadow hover:bg-gray-200"
        onClick={() => {
          setOpen(true);
        }}
        type="button"
      >
        <TrashSimple size={14} />
      </button>
    </>
  );
}
