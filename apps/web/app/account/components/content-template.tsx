import React from "react";
import type { ContentTemplateItemT } from "./content-template-item";
import ContentTemplateItem from "./content-template-item";

export default function ContentTemplate({
  title,
  description,
  items,
}: {
  title: string;
  description?: string;

  items: ContentTemplateItemT[];
}) {
  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        {title}
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-500">{description}</p>
      <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
        {items.map((item) => (
          <ContentTemplateItem item={item} key={item.label} />
        ))}
      </dl>
      {/*<div className="flex border-t border-gray-100 pt-6">*/}
      {/*  <button*/}
      {/*    className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"*/}
      {/*    type="button"*/}
      {/*  >*/}
      {/*    <span aria-hidden="true">+</span> Add another bank*/}
      {/*  </button>*/}
      {/*</div>*/}
    </div>
  );
}
