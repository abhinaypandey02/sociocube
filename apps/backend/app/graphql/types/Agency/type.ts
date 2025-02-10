import { Field, ObjectType } from "type-graphql";

@ObjectType("Agency")
export class AgencyGQL {
  @Field()
  id: number;
  @Field()
  photo: string;
  @Field()
  name: string;
}
