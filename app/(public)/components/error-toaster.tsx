"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function ErrorToaster() {
  const params = useSearchParams();
  useEffect(() => {
    const error = params.get("error");
    if (error) toast.error(error);
  }, [params]);
  return null;
}
