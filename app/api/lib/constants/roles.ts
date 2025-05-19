import "reflect-metadata";

import { registerEnumType } from "type-graphql";

export enum Roles {
  Admin = "admin",
  Brand = "brand",
  Creator = "creator",
  Agency = "agency",
}

export const BRAND_ROLES = [Roles.Brand, Roles.Agency];

registerEnumType(Roles, {
  name: "ROLES",
});
