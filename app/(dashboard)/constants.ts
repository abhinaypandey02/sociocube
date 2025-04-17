import {
  CalendarCheck,
  Handshake,
  MagnifyingGlassPlus,
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
    icon: MagnifyingGlassPlus,
    roles: [Roles.Creator],
  },
  {
    icon: CalendarCheck,
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
    icon: MagnifyingGlassPlus,
    heading: "New Campaign",
    navTitle: "New Campaign",
    href: Route.NewCampaign,
    onlyOnMobile: true,
    parent: Route.YourCampaigns,
    roles: [Roles.Brand, Roles.Agency],
  },
  {
    icon: MagnifyingGlassPlus,
    heading: "Find Creators",
    navTitle: "Search",
    href: Route.Search,
    onlyOnMobile: true,
    roles: [Roles.Brand, Roles.Agency],
  },
  {
    icon: UserCircle,
    heading: "Your Profile",
    navTitle: "Profile",
    href: Route.Profile,
  },
];

export const PRIMARY_NAV_ITEMS = NAV_ITEMS.filter((item) => !item.parent);
