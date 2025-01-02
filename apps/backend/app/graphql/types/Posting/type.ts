import { Field, Int, ObjectType } from "type-graphql";
import { PostingPlatforms } from "../../constants/platforms";

@ObjectType("Posting")
export class PostingGQL {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field(() => [PostingPlatforms])
  platforms: string[];
  @Field(() => [String], { nullable: true })
  deliverables: string[] | null;
  @Field(() => String, { nullable: true })
  externalLink: string | null;
  @Field(() => String, { nullable: true })
  extraDetails: string | null;
  @Field(() => Int, { nullable: true })
  price: number | null;
  @Field()
  barter: boolean;
  @Field(() => Int, { nullable: true })
  minimumFollowers: number | null;
  @Field(() => Int, { nullable: true })
  minimumAge: number | null;
  @Field(() => Int, { nullable: true })
  maximumAge: number | null;
  @Field()
  open: boolean;
  @Field()
  id: number;
  @Field(() => Number)
  createdAt: Date;
  @Field(() => Number)
  updatedAt: Date;
  @Field(() => Int, { nullable: true })
  currencyCountry: number | null;
}
