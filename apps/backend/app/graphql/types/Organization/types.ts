import { Field, ObjectType } from "type-graphql";
import { UserGQL } from "../User/type";
import { AddressGQL } from "../Address/types";

@ObjectType("Organization")
export class OrganizationGQL {
  @Field()
  id: number;
  @Field(() => UserGQL)
  admin: UserGQL;
  @Field()
  name: string;
  @Field({ nullable: true })
  logo?: string;
  @Field({ nullable: true })
  mobile?: string;
  @Field(() => AddressGQL, { nullable: true })
  address?: AddressGQL;
}
