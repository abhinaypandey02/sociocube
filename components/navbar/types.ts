import type { ReactElement } from "react";

import { ButtonProps } from "@/components/button/types";

export interface NavbarProps {
  secondaryLinks: NavbarLink[];
  primaryLinks: NavbarLink[];
  cta?: {
    button: ButtonProps;
    href: string;
  };
  hideCTA?: boolean;
  user?: { photo?: string | null };
}
interface NavbarLink {
  label: string;
  href: string;
  render?: ReactElement;
}
