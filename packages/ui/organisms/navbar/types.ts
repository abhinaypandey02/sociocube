import type { ButtonProps } from "../../atoms/button/types";

export interface NavbarProps {
  sections: NavbarLink[][];
  activeHref?: string;
  disabled?: boolean;
}
interface NavbarLink {
  label: string | ButtonProps;
  href?: string;
}
