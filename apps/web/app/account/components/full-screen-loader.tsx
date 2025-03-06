import { Spinner } from "@phosphor-icons/react/dist/ssr";
import React from "react";

export default function FullScreenLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner className="animate-spin fill-primary" size={60} />
    </div>
  );
}
