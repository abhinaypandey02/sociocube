import type { ReactNode } from "react";
import React from "react";

import type { ContentTemplateItemT } from "./content-template-item";
import ContentTemplateItem from "./content-template-item";

export default function ContentTemplate({
  title,
  description,
  items,
  children,
}: {
  title: string;
  description?: string;

  items?: ContentTemplateItemT[];
  children?: ReactNode;
}) {
  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        {title}
      </h2>
      <p className="mb-5 mt-1 text-sm leading-6 text-gray-500">{description}</p>
      {items ? (
        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
          {items.map((item) => (
            <ContentTemplateItem item={item} key={item.label} />
          ))}
        </dl>
      ) : null}
      {children}
    </div>
  );
}
