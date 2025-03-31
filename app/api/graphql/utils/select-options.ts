import { Field, Int, ObjectType } from "type-graphql";

@ObjectType("CountrySelectOption")
export class CountrySelectOption {
  @Field(() => Int)
  value: number;
  @Field()
  countryCode: string;
  @Field()
  currency: string;
  @Field()
  label: string;
}

@ObjectType("CitySelectOption")
export class CitySelectOption {
  @Field(() => Int)
  value: number;
  @Field()
  label: string;
}
