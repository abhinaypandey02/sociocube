import { useCallback } from "react";

import { NAV_ITEMS } from "@/app/(dashboard)/constants";
import { Route } from "@/constants/routes";
import { useSubPage } from "@/lib/auth-client";

export function useSetSubPage() {
  const { setOpenSubPage } = useSubPage();
  return useCallback(
    (route: Route) =>
      setOpenSubPage(NAV_ITEMS.find((item) => item.href === route)),
    [setOpenSubPage],
  );
}
