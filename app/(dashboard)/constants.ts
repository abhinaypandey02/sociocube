import { ClockCounterClockwise, Plus } from "@phosphor-icons/react/dist/ssr";
import { Route } from "@/constants/routes";
import { NavItem } from "@/app/(dashboard)/type";

export const NAV_ITEMS: NavItem[] = [
  {
    href: Route.Postings,
    bottomTitle: "Apply",
    topTitle: "Campaigns",
    icon: Plus,
    subPages: [
      {
        icon: ClockCounterClockwise,
        title: "Your Applications",
        id: 0,
      },
    ],
  },
];
