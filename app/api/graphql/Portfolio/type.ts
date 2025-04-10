import { Field, Int, ObjectType } from "type-graphql";

@ObjectType("Portfolio")
export class PortfolioGQL {
  @Field(() => String, { nullable: true })
  caption: string | null;
  @Field(() => String, { nullable: true })
  link: string | null;
  @Field(() => String, { nullable: true })
  imageURL: string | null;
  @Field(() => Int)
  id: number;
}
