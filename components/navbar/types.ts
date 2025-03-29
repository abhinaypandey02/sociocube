import type { ReactElement } from "react";
import { ButtonProps } from "@/components/button/types";

export interface NavbarProps {
  secondaryLinks: NavbarLink[];
  primaryLinks: NavbarLink[];
  cta?: {
    button: ButtonProps;
    href: string;
  };
  disableCTA?: boolean;
  userImage?: string;
}
interface NavbarLink {
  label: string;
  href: string;
  render?: ReactElement;
}
