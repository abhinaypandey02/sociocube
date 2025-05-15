import { ApplicationStatus } from "@/__generated__/graphql";

export function getStatusName(status: ApplicationStatus) {
  switch (status) {
    case ApplicationStatus.Shortlisted:
      return "Shortlisted";
    case ApplicationStatus.Selected:
      return "Selected";
    case ApplicationStatus.Rejected:
      return "Rejected";
    case ApplicationStatus.Applied:
      return "In Review";
    case ApplicationStatus.Denied:
      return "Denied";
  }
}
export function getStatusColor(status: ApplicationStatus): [string, string] {
  switch (status) {
    case ApplicationStatus.Selected:
      return ["#b9ffc3", "#048c06"];
    case ApplicationStatus.Shortlisted:
      return ["#a9dcff", "#17577c"];
    case ApplicationStatus.Rejected:
    case ApplicationStatus.Denied:
      return ["#ffcbcb", "#b81111"];
    default:
      return ["#ffe793", "#756116"];
  }
}
