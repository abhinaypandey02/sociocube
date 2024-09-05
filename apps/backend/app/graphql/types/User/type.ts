import { Field, ObjectType } from "type-graphql";
import { AuthScopes } from "../../constants/scopes";
import { Roles } from "../../constants/roles";

@ObjectType("User")
export class UserGQL {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  photo?: string;
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  phone?: string;
  @Field(() => [AuthScopes])
  scopes: AuthScopes[];
  @Field(() => [Roles])
  roles: Roles[];
}
