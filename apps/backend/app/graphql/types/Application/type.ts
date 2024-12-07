import { Field, ObjectType } from "type-graphql";

@ObjectType("Application")
export class ApplicationGQL {
  @Field()
  comment: string;
}
