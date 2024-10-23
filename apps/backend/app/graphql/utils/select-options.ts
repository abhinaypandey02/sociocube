import { Field, Int, ObjectType } from "type-graphql";

@ObjectType("SelectOption")
export class SelectOption {
  @Field(() => Int)
  id: number;
  @Field()
  label: string;
}
