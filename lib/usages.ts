export enum UsageType {
  AiSearch = "AiSearch",
  PostingAnnouncement = "PostingAnnouncement",
  GlobalAnnouncement = "GlobalAnnouncement",
}

export enum SubscriptionPlan {
  Plus = "Plus",
  Free = "Free",
}
export type MaxUsage = Record<SubscriptionPlan, number>;

export const MaxUsages: Record<UsageType, MaxUsage> = {
  [UsageType.AiSearch]: {
    [SubscriptionPlan.Plus]: 10,
    [SubscriptionPlan.Free]: 2,
  },
  [UsageType.PostingAnnouncement]: {
    [SubscriptionPlan.Plus]: 3,
    [SubscriptionPlan.Free]: 1,
  },
  [UsageType.GlobalAnnouncement]: {
    [SubscriptionPlan.Plus]: 10,
    [SubscriptionPlan.Free]: 1,
  },
};

export const SearchResultsLength = {
  [SubscriptionPlan.Plus]: 20,
  [SubscriptionPlan.Free]: 5,
};
