import { ElementType } from "react";

import { Roles } from "@/__generated__/graphql";
import { Route } from "@/constants/routes";

export interface NavItem {
  href: Route;
  navTitle: string;
  heading: string;
  icon: ElementType;
  parent?: Route;
  onlyOnMobile?: boolean;
  roles?: Roles[];
}
