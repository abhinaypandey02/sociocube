import { Field, Int, ObjectType } from "type-graphql";

@ObjectType("SelectOption")
export class SelectOption {
  @Field(() => Int)
  value: number;
  @Field()
  label: string;
}
