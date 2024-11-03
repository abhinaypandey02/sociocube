import React, { useCallback } from "react";
import { Input } from "ui/input";
import { useForm } from "react-hook-form";
import Form from "ui/form";
import { useRouter } from "next/navigation";
import { useAuthMutation } from "../../../lib/apollo-client";
import { UPDATE_USER } from "../../../lib/mutations";
import ContentTemplate from "./content-template";
import type { AccountSectionData } from "./account-view";

export default function PricingSection({ data }: { data: AccountSectionData }) {
  const form = useForm({
    defaultValues: data.pricing || {},
  });
  const [saveUserMutation] = useAuthMutation(UPDATE_USER);
  const router = useRouter();
  const handleSave = useCallback(
    (field: keyof NonNullable<AccountSectionData["pricing"]>) => async () => {
      await saveUserMutation({
        data: {
          pricing: {
            [field]: form.getValues(field),
          },
        },
      });
      router.refresh();
    },
    [form.getValues, saveUserMutation],
  );
  return (
    <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
      <Form
        className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none"
        form={form}
      >
        <ContentTemplate
          description="Fill in details about your charges"
          items={[
            {
              label: "Starting price",
              value: data.pricing?.starting,
              editComponent: (
                <Input name="starting" rules={{ valueAsNumber: true }} />
              ),
              onSubmit: handleSave("starting"),
            },
          ]}
          title="Pricing"
        />
      </Form>
    </main>
  );
}
