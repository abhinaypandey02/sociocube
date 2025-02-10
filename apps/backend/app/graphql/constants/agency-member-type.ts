import "reflect-metadata";
import { registerEnumType } from "type-graphql";

export enum AgencyMemberType {
  Admin = "ADMIN",
}

registerEnumType(AgencyMemberType, {
  name: "AgencyMemberType",
});
