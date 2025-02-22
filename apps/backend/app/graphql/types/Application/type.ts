import { Field, ObjectType } from "type-graphql";
import { ApplicationStatus } from "./db/schema";

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
  @Field(() => ApplicationStatus)
  status: ApplicationStatus;
  @Field()
  id: number;
  @Field(() => Number)
  createdAt: Date;
}
