"use client";
import React from "react";
import { Button } from "ui/button";
import { useRouter } from "next/navigation";
import { handleGQLErrors, useAuthMutation } from "../../../lib/apollo-client";
import { Route } from "../../../constants/routes";
import { DISCONNECT_INSTAGRAM } from "../../../lib/mutations";
import ContentTemplate from "./content-template";
import type { AccountSectionData } from "./account-view";

export default function ConnectionsSection({
  data,
}: {
  data: AccountSectionData;
}) {
  const router = useRouter();
  const [disconnectInstagram, { called }] =
    useAuthMutation(DISCONNECT_INSTAGRAM);
  return (
    <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <ContentTemplate
          description="Manage your connected accounts"
          items={[
            {
              label: "Instagram",
              value: data.instagramStats?.isVerified
                ? "Connected"
                : "Not connected",
              editComponent: !data.instagramStats?.isVerified ? (
                <a href={`/_auth/instagram?redirectURL=${Route.Account}`}>
                  <Button>Connect</Button>
                </a>
              ) : (
                <Button
                  disabled={Boolean(called)}
                  onClick={() => {
                    disconnectInstagram({})
                      .catch(handleGQLErrors)
                      .finally(() => {
                        router.refresh();
                      });
                  }}
                >
                  Disconnect
                </Button>
              ),
            },
          ]}
          title="Connections"
        />
      </div>
    </main>
  );
}
