import { Field, ObjectType } from "type-graphql";

@ObjectType("Review")
export class ReviewGQL {
  @Field()
  userRating: number;
  @Field()
  agencyRating: number;
  @Field({ nullable: true })
  userFeedback: string;
  @Field({ nullable: true })
  agencyFeedback: string;
}
