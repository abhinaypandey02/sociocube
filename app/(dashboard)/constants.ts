import {
  CalendarCheck,
  Handshake,
  MagnifyingGlassPlus,
  UserCircle,
} from "@phosphor-icons/react/dist/ssr";

import { NavItem } from "@/app/(dashboard)/type";
import { Route } from "@/constants/routes";

export const NAV_ITEMS: NavItem[] = [
  {
    href: Route.Campaigns,
    navTitle: "Apply",
    heading: "Active Campaigns",
    icon: MagnifyingGlassPlus,
  },
  {
    icon: CalendarCheck,
    heading: "Your Applications",
    navTitle: "Applications",
    href: Route.Applications,
    parent: Route.Campaigns,
  },
  {
    icon: Handshake,
    heading: "Your Campaigns",
    navTitle: "Your Campaigns",
    href: Route.YourCampaigns,
  },
  {
    icon: MagnifyingGlassPlus,
    heading: "New Campaign",
    navTitle: "New Campaign",
    href: Route.NewCampaign,
    onlyOnMobile: true,
    parent: Route.YourCampaigns,
  },
  {
    icon: UserCircle,
    heading: "Your Profile",
    navTitle: "Profile",
    href: Route.Profile,
  },
];

export const PRIMARY_NAV_ITEMS = NAV_ITEMS.filter((item) => !item.parent);
