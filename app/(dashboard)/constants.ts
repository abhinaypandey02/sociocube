import {
  ClockCounterClockwise,
  Gear,
  Handshake,
  MagnifyingGlass,
  MoneyWavy,
  Plus,
  UserCircle,
} from "@phosphor-icons/react/dist/ssr";

import { Roles } from "@/__generated__/graphql";
import { NavItem } from "@/app/(dashboard)/type";
import { Route } from "@/constants/routes";

export const NAV_ITEMS: NavItem[] = [
  {
    href: Route.Campaigns,
    navTitle: "Apply",
    heading: "Active Campaigns",
    icon: MoneyWavy,
    roles: [Roles.Creator],
  },
  {
    icon: ClockCounterClockwise,
    heading: "Your Applications",
    navTitle: "Applications",
    href: Route.Applications,
    parent: Route.Campaigns,
    roles: [Roles.Creator],
  },
  {
    icon: Handshake,
    heading: "Your Campaigns",
    navTitle: "Your Campaigns",
    href: Route.YourCampaigns,
    roles: [Roles.Brand, Roles.Agency],
  },
  {
    icon: Plus,
    heading: "New Campaign",
    navTitle: "New Campaign",
    href: Route.NewCampaign,
    onlyOnMobile: true,
    parent: Route.YourCampaigns,
    roles: [Roles.Brand, Roles.Agency],
    requireAuth: true,
  },
  {
    icon: MagnifyingGlass,
    heading: "Find Creators",
    navTitle: "Search",
    href: Route.Search,
    roles: [Roles.Brand, Roles.Agency],
  },
  {
    icon: UserCircle,
    heading: "Profile",
    navTitle: "Profile",
    href: Route.Profile,
    requireAuth: true,
  },
  {
    icon: Gear,
    heading: "Settings",
    navTitle: "Settings",
    href: Route.Settings,
    parent: Route.Profile,
    requireAuth: true,
  },
];

export const PRIMARY_NAV_ITEMS = NAV_ITEMS.filter((item) => !item.parent);
