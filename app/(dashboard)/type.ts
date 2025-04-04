import { ElementType } from "react";
import { Route } from "@/constants/routes";

export interface NavItem {
  href: Route;
  bottomTitle: string;
  topTitle: string;
  icon: ElementType;
  subPages: {
    icon: ElementType;
    title: string;
    id: number;
  }[];
}
