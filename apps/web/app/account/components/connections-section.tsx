"use client";
import React, { useState } from "react";
import { Button } from "ui/button";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/navigation";
import { ONBOARDING_SCOPES } from "../../onboarding/constants";
import { handleGQLErrors, tokenContext } from "../../../lib/apollo-client";
import { useToken } from "../../../lib/auth-client";
import { Route } from "../../../constants/routes";
import ContentTemplate from "./content-template";
import type { AccountSectionData } from "./account-view";

export default function ConnectionsSection({
  data,
}: {
  data: AccountSectionData;
}) {
  const token = useToken();
  const client = useApolloClient();
  const router = useRouter();
  const [loading, setLoading] = useState<string>();
  return (
    <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <ContentTemplate
          description="Manage your connected accounts"
          items={ONBOARDING_SCOPES.map((scope) => ({
            label: scope.title,
            value: data.scopes.includes(scope.id)
              ? "Connected"
              : "Not connected",
            editComponent: !data.scopes.includes(scope.id) ? (
              <a href={`${scope.url}?redirectURL=${Route.Account}`}>
                <Button>Connect</Button>
              </a>
            ) : (
              <Button
                disabled={Boolean(loading)}
                onClick={() => {
                  setLoading(scope.id);
                  client
                    .mutate({
                      mutation: scope.query,
                      context: tokenContext(token),
                    })
                    .then(() => {
                      router.refresh();
                    })
                    .catch(handleGQLErrors)
                    .finally(() => {
                      setLoading(undefined);
                    });
                }}
              >
                Disconnect
              </Button>
            ),
          }))}
          title="Connections"
        />
      </div>
    </main>
  );
}
