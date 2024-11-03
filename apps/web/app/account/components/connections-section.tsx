import React from "react";
import { Button } from "ui/button";
import { ALL_SCOPES } from "../../onboarding/constants";
import ContentTemplate from "./content-template";
import type { AccountSectionData } from "./account-view";

export default function ConnectionsSection({
  data,
}: {
  data: AccountSectionData;
}) {
  return (
    <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <ContentTemplate
          description="Manage your connected accounts"
          items={ALL_SCOPES.map((scope) => ({
            label: scope.title,
            value: data.scopes.includes(scope.id)
              ? "Connected"
              : "Not connected",
            editComponent: !data.scopes.includes(scope.id) ? (
              <a href={scope.url}>
                <Button>Connect</Button>
              </a>
            ) : null,
          }))}
          title="Connections"
        />
      </div>
    </main>
  );
}
