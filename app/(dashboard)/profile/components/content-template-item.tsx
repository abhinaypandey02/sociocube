import { useRouter } from "next/navigation";
import React, { type ReactNode, useState } from "react";

export interface ContentTemplateItemT {
  label: string;
  value: ReactNode;
  editComponent: ReactNode;
  onSubmit?: () => Promise<boolean>;
}

export default function ContentTemplateItem({
  item,
}: {
  item: ContentTemplateItemT;
}) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <div className="pt-6 sm:flex">
      <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
        {item.label}
      </dt>
      <dd className="mt-1 flex items-start justify-between gap-x-6 sm:mt-0 sm:flex-auto">
        <div className="text-gray-900">
          {editing ? item.editComponent : item.value}
        </div>
        {item.onSubmit ? (
          <div className="flex gap-2">
            <button
              className="font-semibold text-accent hover:text-indigo-500"
              disabled={loading}
              onClick={async () => {
                if (editing) {
                  setLoading(true);
                  const result = await item.onSubmit?.();
                  setLoading(false);
                  if (!result) return;
                  router.refresh();
                }
                setEditing((val) => !val);
              }}
              type="button"
            >
              {loading ? "Saving..." : ""}
              {editing && !loading ? "Save" : null}
              {!editing && (item.value ? "Update" : "Add")}
            </button>
            {editing ? (
              <button
                className="font-semibold text-red-600 hover:text-red-500"
                disabled={loading}
                onClick={() => {
                  setEditing(false);
                }}
                type="button"
              >
                Cancel
              </button>
            ) : null}
          </div>
        ) : (
          item.editComponent
        )}
      </dd>
    </div>
  );
}
