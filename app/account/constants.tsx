import type { Icon } from "@phosphor-icons/react";
import { MapPin, MoneyWavy, ShareNetwork } from "@phosphor-icons/react";
import { SignOut, UserCircle } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import type { FC } from "react";

import { getRoute } from "@/constants/routes";
import { useLogout } from "@/lib/auth-client";

import type { AccountSectionData } from "./components/account-view";
import ConnectionsSection from "./components/connections-section";
import LocationSection from "./components/location-section";
import PricingSection from "./components/pricing-section";
import ProfileSection from "./components/profile-section";

export function useAccountSections() {
  const logout = useLogout();
  const router = useRouter();
  return [
    {
      title: "Profile",
      icon: UserCircle,
      component: ProfileSection,
    },
    {
      title: "Connections",
      icon: ShareNetwork,
      component: ConnectionsSection,
    },
    {
      title: "Pricing",
      icon: MoneyWavy,
      component: PricingSection,
    },
    {
      title: "Location",
      icon: MapPin,
      component: LocationSection,
    },
    {
      title: "Logout",
      icon: SignOut,
      onClick: () => {
        router.push(getRoute("Home"));
        void logout().then(() => {
          router.refresh();
        });
      },
    },
  ] as {
    title: string;
    icon: Icon;
    component?: FC<{ data: AccountSectionData }>;
    onClick?: () => void;
  }[];
}
