import { registerEnumType } from "type-graphql";

export enum PostingRole {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
}

registerEnumType(PostingRole, {
  name: "POSTING_ROLE",
});
