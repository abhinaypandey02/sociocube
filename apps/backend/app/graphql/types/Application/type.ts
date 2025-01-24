import { Field, ObjectType } from "type-graphql";

@ObjectType("Application")
export class ApplicationGQL {
  @Field({ nullable: true })
  comment: string;
  @Field()
  email: string;
  @Field({ nullable: true })
  phone: string;
  @Field()
  referralEarnings: number;
}
