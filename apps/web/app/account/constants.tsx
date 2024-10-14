import type { Icon } from "@phosphor-icons/react";
import { UserCircle, SignOut } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { useLogout } from "../../lib/auth-client";
import { Route } from "../../constants/routes";
import ProfileSection from "./components/profile-section";
import type { AccountSectionData } from "./components/account-view";

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
      title: "Logout",
      icon: SignOut,
      onClick: () => {
        router.push(Route.Home);
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
