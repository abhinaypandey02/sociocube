"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

export default function ErrorToaster() {
  const params = useSearchParams();
  useEffect(() => {
    const error = params.get("error");
    if (error) toast.error(error);
  }, [params]);
  return null;
}
