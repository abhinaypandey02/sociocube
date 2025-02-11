import "reflect-metadata";
import { registerEnumType } from "type-graphql";

export enum AgencyMemberType {
  Admin = "ADMIN",
  Owner = "OWNER",
}

registerEnumType(AgencyMemberType, {
  name: "AgencyMemberType",
});
