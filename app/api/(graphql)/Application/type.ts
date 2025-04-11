import { Field, ObjectType } from "type-graphql";

import { ApplicationStatus } from "./db";

@ObjectType("Application")
export class ApplicationGQL {
  @Field({ nullable: true })
  comment: string;
  @Field()
  referralEarnings: number;
  @Field(() => ApplicationStatus)
  status: ApplicationStatus;
  @Field()
  id: number;
  @Field(() => Number)
  createdAt: Date;
}
