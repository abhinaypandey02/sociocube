"use client";
import React, { useState } from "react";
import { Link, Check } from "@phosphor-icons/react";
import { Button, Variants } from "ui/button";
import { toast } from "react-hot-toast";

export default function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard!");
    setCopied(true);
  };
  return (
    <Button
      className="flex items-center gap-2"
      onClick={copyLink}
      outline
      variant={Variants.ACCENT}
    >
      {copied ? <Check size={18} /> : <Link size={18} />}
    </Button>
  );
}
