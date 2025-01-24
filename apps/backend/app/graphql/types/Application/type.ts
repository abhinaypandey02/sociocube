import { Field, ObjectType } from "type-graphql";

@ObjectType("Application")
export class ApplicationGQL {
  @Field({ nullable: true })
  comment: string;
  @Field()
  email: string;
  @Field()
  referralEarnings: number;
}
