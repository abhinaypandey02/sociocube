import {
  ChatCircleDots,
  EnvelopeSimple,
  InstagramLogo,
  Phone,
} from "@phosphor-icons/react";
import React from "react";
import { toast } from "react-hot-toast";

import { getRoute } from "@/constants/routes";
import { useToggleSubscribeModal } from "@/lib/auth-client";
import { useSubscription } from "@/lib/auth-client";

export function ContactButtons({
  email,
  phone,
  chatUsername,
  instaUsername,
}: {
  email?: string | null;
  phone?: string | null;
  chatUsername?: string | null;
  instaUsername?: string | null;
}) {
  const toggleSubscribeModal = useToggleSubscribeModal();
  const [subscription] = useSubscription();

  const copyEmail = async () => {
    if (!subscription?.existing) {
      toggleSubscribeModal();
      return;
    }

    if (email) {
      await navigator.clipboard.writeText(email);
      toast.success(`Copied ${email} to clipboard`);
    }
  };

  const copyPhone = async () => {
    if (!subscription?.existing) {
      toggleSubscribeModal();
      return;
    }

    if (phone) {
      await navigator.clipboard.writeText(phone);
      toast.success(`Copied ${phone} to clipboard`, {
        duration: 5000,
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <a className="text-accent" href={`${getRoute("Inbox")}/${chatUsername}`}>
        <ChatCircleDots size={19} />
      </a>
      <a
        className="text-accent"
        href={`https://instagram.com/${instaUsername}`}
        rel="noopener"
        target="_blank"
      >
        <InstagramLogo size={19} />
      </a>
      <button className="text-accent" onClick={copyEmail}>
        <EnvelopeSimple size={20} />
      </button>
      {phone ? (
        <button className="text-accent" onClick={copyPhone} type="button">
          <Phone size={20} />
        </button>
      ) : null}
    </div>
  );
}
