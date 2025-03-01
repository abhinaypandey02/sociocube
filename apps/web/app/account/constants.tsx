import type { Icon } from "@phosphor-icons/react";
import { MapPin, MoneyWavy, ShareNetwork, Users } from "@phosphor-icons/react";
import { SignOut, UserCircle } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { useLogout } from "../../lib/auth-client";
import { getRoute } from "../../constants/routes";
import ProfileSection from "./components/profile-section";
import type { AccountSectionData } from "./components/account-view";
import PricingSection from "./components/pricing-section";
import LocationSection from "./components/location-section";
import ConnectionsSection from "./components/connections-section";
import AgencyProfileSection from "./components/agency-profile-section";
import AgencyLocationSection from "./components/agency-location-section";
import type { AgencyViewData } from "./agency/components/agency-view";
import AgencyMembersSection from "./components/agency-members-section";

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

export function useAgencySections() {
  return [
    {
      title: "Profile",
      icon: UserCircle,
      component: AgencyProfileSection,
    },
    {
      title: "Location",
      icon: MapPin,
      component: AgencyLocationSection,
    },
    {
      title: "Members",
      icon: Users,
      component: AgencyMembersSection,
    },
  ] as {
    title: string;
    icon: Icon;
    component?: FC<{ data: AgencyViewData }>;
    onClick?: () => void;
  }[];
}
