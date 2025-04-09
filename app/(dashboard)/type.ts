import { ElementType } from "react";

import { Route } from "@/constants/routes";

export interface NavItem {
  href: Route;
  navTitle: string;
  heading: string;
  icon: ElementType;
  parent?: Route;
  onlyOnMobile?: boolean;
}
