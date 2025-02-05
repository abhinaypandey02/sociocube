import { Field, ObjectType } from "type-graphql";

@ObjectType("Portfolio")
export class PortfolioGQL {
  @Field({ nullable: true })
  caption: string;
  @Field()
  imageURL: string;
}
