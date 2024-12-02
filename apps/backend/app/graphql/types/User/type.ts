import { Field, InputType, ObjectType } from "type-graphql";
import { AuthScopes } from "../../constants/scopes";
import { Roles } from "../../constants/roles";

@ObjectType("Pricing")
@InputType("PricingInput")
export class Pricing {
  @Field({ nullable: true })
  starting?: number;
}
@ObjectType("Currency")
export class Currency {
  @Field({ nullable: true })
  symbol?: string;
  @Field({ nullable: true })
  name?: string;
}

@ObjectType("Location")
export class Location {
  @Field({ nullable: true })
  city?: string;
  @Field({ nullable: true })
  country?: string;
  @Field(() => Currency, { nullable: true })
  currency?: Currency;
}
@ObjectType("LocationID")
export class LocationID {
  @Field({ nullable: true })
  city?: number;
  @Field({ nullable: true })
  country?: number;
  @Field({ nullable: true })
  state?: number;
}

@ObjectType("OnboardingData")
export class OnboardingData {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  bio?: string;
  @Field({ nullable: true })
  photo?: string;
  @Field({ nullable: true })
  category?: string;
  @Field({ nullable: true })
  gender?: string;
  @Field({ nullable: true })
  dob?: string;
  @Field({ nullable: true })
  username?: string;
  @Field({ nullable: true })
  city?: number;
  @Field({ nullable: true })
  state?: number;
  @Field({ nullable: true })
  country?: number;
  @Field(() => Pricing, { nullable: true })
  pricing?: Pricing;
  @Field(() => Currency, { nullable: true })
  currency?: Currency;
}
@ObjectType("User")
export class UserGQL {
  @Field()
  id: number;
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  bio?: string;
  @Field({ nullable: true })
  photo?: string;
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  companyName?: string;
  @Field({ nullable: true })
  phone?: string;
  @Field(() => [AuthScopes])
  scopes: AuthScopes[];
  @Field({ nullable: true })
  onboardingData?: OnboardingData;
  @Field(() => [Roles], { nullable: true })
  roles?: Roles[];
  @Field({ nullable: true })
  isOnboarded?: boolean;
  @Field({ nullable: true })
  category?: string;
  @Field({ nullable: true })
  gender?: string;
  @Field({ nullable: true })
  dob?: string;
  @Field({ nullable: true })
  username?: string;
  @Field({ nullable: true })
  location?: Location;
  @Field(() => Pricing, { nullable: true })
  pricing?: Pricing;
}
