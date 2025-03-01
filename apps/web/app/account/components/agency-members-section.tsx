import React, { useMemo, useState } from "react";
import Table from "ui/table";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Form from "ui/form";
import { useForm } from "react-hook-form";
import { Input } from "ui/input";
import { Button } from "ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "@phosphor-icons/react";
import { toast } from "react-hot-toast";
import Modal from "../../../components/modal";
import { INVITE_ADMIN } from "../../../lib/mutations";
import type { AgencyViewData } from "../agency/components/agency-view";
import { AgencyMemberType, InviteType } from "../../../__generated__/graphql";
import { handleGQLErrors, useAuthMutation } from "../../../lib/apollo-client";

const colHelper =
  createColumnHelper<AgencyViewData["agency"]["members"][number]>();
const AGENCY_MEMBER_COLUMNS = [
  colHelper.accessor("name", {
    header: "User",
    cell: (value) => {
      const val = value.getValue();
      if (!val) return null;
      return (
        <div className="flex items-center gap-5">
          {value.row.original.photo ? (
            <Image
              alt={value.row.original.name || ""}
              className="size-12 rounded-full object-cover"
              height={48}
              src={value.row.original.photo}
              width={48}
            />
          ) : null}
          {val}
        </div>
      );
    },
  }),
  colHelper.accessor("email", {
    header: "Email",
  }),
  colHelper.accessor("type", {
    header: "Role",
  }),
];

export default function AgencyMembersSection({
  data,
}: {
  data: AgencyViewData;
}) {
  const [inviteAdmin, { loading }] = useAuthMutation(INVITE_ADMIN);
  const form = useForm({
    defaultValues: {
      email: "",
      type: InviteType.AgencyAdmin,
    },
  });
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const inviteTypeOptions = useMemo(
    () => [
      {
        label: "Admin",
        value: InviteType.AgencyAdmin,
      },
      ...(data.type === AgencyMemberType.Owner
        ? [
            {
              label: "Admin",
              value: InviteType.AgencyAdmin,
            },
          ]
        : []),
    ],
    [data.type],
  );
  return (
    <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
      <Modal
        close={() => {
          setOpenModal(false);
        }}
        open={openModal}
      >
        <h3 className="mb-6 text-xl font-semibold">
          Invite new admins to {data.agency.name}
        </h3>
        <Form
          className="space-y-7"
          form={form}
          onSubmit={form.handleSubmit((values) => {
            inviteAdmin({
              args: {
                agency: data.agency.id,
                email: values.email,
                type: values.type,
              },
            })
              .then(() => {
                setOpenModal(false);
                toast.success("Invite sent successfully!");
                form.reset();
                router.refresh();
              })
              .catch(handleGQLErrors);
          })}
        >
          <Input
            label="Email"
            name="email"
            placeholder="someone@example.com"
            type="email"
          />
          {inviteTypeOptions.length > 1 && (
            <Input label="Role" name="type" options={inviteTypeOptions} />
          )}
          <Button
            className="ml-auto"
            disabled={loading}
            loading={loading}
            type="submit"
          >
            Send invite
          </Button>
        </Form>
      </Modal>
      <div className="mb-5 flex justify-end">
        <Button
          className="flex items-center gap-1.5 !px-3 !py-0.5 text-sm"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <Plus />
          Invite
        </Button>
      </div>
      <Table columns={AGENCY_MEMBER_COLUMNS} data={data.agency.members} />
    </main>
  );
}
