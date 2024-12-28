import { Field, Int, ObjectType } from "type-graphql";

@ObjectType("Posting")
export class PostingGQL {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field(() => [String], { nullable: true })
  deliverables: string[] | null;
  @Field(() => String, { nullable: true })
  externalLink: string | null;
  @Field(() => Int, { nullable: true })
  price: number | null;
  @Field()
  barter: boolean;
  @Field()
  minimumInstagramFollower: number;
  @Field()
  minimumAge: number;
  @Field()
  maximumAge: number;
  @Field()
  open: boolean;
  @Field()
  id: number;
  @Field(() => Number)
  createdAt: Date;
  @Field(() => Number)
  updatedAt: Date;
}
