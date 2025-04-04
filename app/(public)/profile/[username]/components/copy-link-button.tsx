"use client";
import React, { useState } from "react";
import { Check, Link } from "@phosphor-icons/react";
import { toast } from "react-hot-toast";
import { IconButton } from "@/components/icon-button";

export default function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard!");
    setCopied(true);
  };
  return (
    <IconButton onClick={copyLink}>
      {copied ? <Check size={18} /> : <Link size={18} />}
    </IconButton>
  );
}
