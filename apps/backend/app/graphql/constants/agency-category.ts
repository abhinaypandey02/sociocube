import "reflect-metadata";
import { registerEnumType } from "type-graphql";

export enum AgencyCategory {
  Agency = "agency",
  Brand = "brand",
}

registerEnumType(AgencyCategory, {
  name: "AgencyCategory",
});
