import { Eligibility } from "@backend/lib/constants/eligibility";
import { PostingPlatforms } from "@backend/lib/constants/platforms";
import { Field, Int, ObjectType } from "type-graphql";

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
  @Field({ nullable: true })
  hasApplied?: boolean;
  @Field()
  inReview: boolean;
  @Field(() => Eligibility, { nullable: true })
  eligibility?: Eligibility;
  @Field(() => Int, { nullable: true })
  currencyCountry: number | null;
}
