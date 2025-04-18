import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

import Form from "@/components/form";
import { Input } from "@/components/input";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { UPDATE_USER } from "@/lib/mutations";

import type { AccountSectionData } from "./account-view";
import ContentTemplate from "./content-template";

export default function PricingSection({ data }: { data: AccountSectionData }) {
  const form = useForm({
    defaultValues: data.pricing || {},
  });
  const [saveUserMutation] = useAuthMutation(UPDATE_USER);
  const router = useRouter();
  const handleSave = useCallback(
    (field: keyof NonNullable<AccountSectionData["pricing"]>) => async () => {
      await saveUserMutation({
        updatedUser: {
          pricing: {
            [field]: form.getValues(field),
          },
        },
      }).catch(handleGQLErrors);
      router.refresh();
      return true;
    },
    [form.getValues, saveUserMutation],
  );
  return (
    <div className="lg:flex-auto">
      <Form className="space-y-16 sm:space-y-20" form={form}>
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
    </div>
  );
}
