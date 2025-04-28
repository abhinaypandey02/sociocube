import { Field, Int, ObjectType } from "type-graphql";

@ObjectType("CitySelectOption")
export class CitySelectOption {
  @Field(() => Int)
  value: number;
  @Field()
  label: string;
}
