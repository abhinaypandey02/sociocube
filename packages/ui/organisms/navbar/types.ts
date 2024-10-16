import type { ButtonProps } from "../../atoms/button/types";

export interface NavbarProps {
  secondaryLinks: NavbarLink[];
  primaryLinks: NavbarLink[];
  cta?: {
    button: ButtonProps;
    href: string;
  };
  disableCTA?: boolean;
}
interface NavbarLink {
  label: string;
  href: string;
}
