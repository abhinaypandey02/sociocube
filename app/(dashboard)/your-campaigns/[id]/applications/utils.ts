import { ApplicationStatus } from "@/__generated__/graphql";

export function getStatusName(status: ApplicationStatus) {
  switch (status) {
    case ApplicationStatus.Completed:
      return "Completed";
    case ApplicationStatus.Rejected:
      return "Rejected";
    case ApplicationStatus.Interested:
      return "Interested";
    case ApplicationStatus.Applied:
      return "In Review";
  }
}
export function getStatusColor(status: ApplicationStatus): [string, string] {
  switch (status) {
    case ApplicationStatus.Completed:
      return ["#b9ffc3", "#048c06"];
    case ApplicationStatus.Rejected:
      return ["#ffcbcb", "#b81111"];
    case ApplicationStatus.Interested:
      return ["#a9dcff", "#17577c"];
    default:
      return ["#ffe793", "#756116"];
  }
}
