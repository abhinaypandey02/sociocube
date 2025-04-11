import "reflect-metadata";

import { registerEnumType } from "type-graphql";

export enum Roles {
  Admin = "admin",
  Brand = "brand",
  Creator = "creator",
  Agency = "agency",
}

registerEnumType(Roles, {
  name: "ROLES",
});
