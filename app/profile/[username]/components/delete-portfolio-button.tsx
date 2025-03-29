"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { TrashSimple } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import Modal from "../../../../components/modal";
import type { GetSellerQuery } from "@/__generated__/graphql";
import {
  handleGQLErrors,
  useAuthMutation,
} from "@/lib/apollo-client";
import { DELETE_PORTFOLIO } from "@/lib/mutations";
import { revalidateProfilePage } from "@/lib/revalidate";

export default function DeletePortfolioButton({
  work,
  username,
  isLink,
}: {
  work: NonNullable<
    NonNullable<GetSellerQuery["getSeller"]>["portfolio"]
  >[number];
  username: string;
  isLink: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [deletePortfolio, { data, loading, reset }] =
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
    reset();
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
          Delete this {isLink ? "link" : "portfolio work"}?
        </h3>
        <div className="space-y-5">
          {work.imageURL ? (
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
          ) : null}
          {work.caption ? (
            <Input
              disabled
              label={isLink ? "Title" : "Caption"}
              name="caption"
              value={work.caption}
            />
          ) : null}
          {work.link ? (
            <Input
              disabled
              label={isLink ? "URL" : "Link to this work"}
              name="link"
              value={work.link}
            />
          ) : null}
          <Button
            className="w-full"
            invert
            loading={loading}
            onClick={onSubmit}
            success={data?.deletePortfolio}
            type="button"
          >
            Delete {isLink ? "link" : "portfolio"}
          </Button>
        </div>
      </Modal>
      <button
        className="absolute right-0 top-0  flex size-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-gray-50 text-red-500 shadow hover:bg-gray-200"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setOpen(true);
        }}
        type="button"
      >
        <TrashSimple size={14} />
      </button>
    </>
  );
}
