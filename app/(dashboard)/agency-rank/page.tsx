import DashboardWrapper from "@/app/(dashboard)/components/dashboard-wrapper";
import { Route } from "@/constants/routes";

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  return (
    <DashboardWrapper title={"Agency Ranks"} activeKey={Route.Search}>
      ranks
    </DashboardWrapper>
  );
}
