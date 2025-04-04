import { CalendarCheck, PiggyBank } from "@phosphor-icons/react/dist/ssr";
import { Route } from "@/constants/routes";
import { NavItem } from "@/app/(dashboard)/type";

export const NAV_ITEMS: NavItem[] = [
  {
    href: Route.Postings,
    navTitle: "Apply",
    heading: "Active Campaigns",
    icon: PiggyBank,
  },
  {
    icon: CalendarCheck,
    heading: "Your Applications",
    navTitle: "Applications",
    href: Route.AccountApplications,
    parent: Route.Postings,
  },
];

export const PRIMARY_NAV_ITEMS = NAV_ITEMS.filter((item) => !item.parent);
