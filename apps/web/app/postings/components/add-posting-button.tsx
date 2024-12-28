"use client";
import React, { useState } from "react";
import { Button, Variants } from "ui/button";
import Form from "ui/form";
import { useForm } from "react-hook-form";
import { Input } from "ui/input";
import Modal from "../../../components/modal";
import type { GetCurrentUserQuery } from "../../../__generated__/graphql";

export default function AddPostingButton({
  data,
  loading,
}: {
  data: GetCurrentUserQuery;
  loading: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm();
  return (
    <>
      <Modal
        close={() => {
          setIsModalOpen(false);
        }}
        open={isModalOpen}
      >
        <h3 className="mb-6 text-2xl font-bold text-gray-700">
          Add new posting
        </h3>
        <Form form={form}>
          <Input name="title" />
        </Form>
      </Modal>
      <Button
        loading={loading}
        onClick={() => {
          setIsModalOpen(true);
        }}
        variant={Variants.ACCENT}
      >
        {data.user ? "+ Add posting" : "+ Login to add posting"}
      </Button>
    </>
  );
}
