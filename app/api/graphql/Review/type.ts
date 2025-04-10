import { Field, ObjectType } from "type-graphql";

@ObjectType("Review")
export class ReviewGQL {
  @Field()
  rating: number;
  @Field(() => String, { nullable: true })
  feedback: string | null;
  @Field()
  name: string;
  @Field()
  username: string;
  @Field(() => String, { nullable: true })
  photo: string | null;
  portfolio: number | null;
}
