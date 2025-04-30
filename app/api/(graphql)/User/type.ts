import { Roles } from "@backend/lib/constants/roles";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType("Pricing")
@InputType("PricingInput")
export class Pricing {
  @Field(() => Number, { nullable: true })
  starting: number | null;
}

@ObjectType("Location")
export class Location {
  @Field({ nullable: true })
  city?: string;
  @Field({ nullable: true })
  country?: string;
  @Field()
  currency: string;
}
@ObjectType("LocationID")
export class LocationID {
  @Field({ nullable: true })
  city?: number;
  @Field({ nullable: true })
  country?: number;
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
  phone?: string;
  @Field(() => Roles)
  role?: Roles;
  @Field({ nullable: true })
  isOnboarded?: boolean;
  @Field()
  emailVerified: boolean;
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

export interface UserSearchFilters {
  niche?: string | null;
  cities?: string[] | null;
  states?: string[] | null;
  countries?: string[] | null;
  cityIDs?: number[] | null;
  stateIDs?: number[] | null;
  countryIDs?: number[] | null;
  gender?: string | null;
  minimumAge?: number | null;
  maximumAge?: number | null;
  followersFrom?: number | null;
  followersTo?: number | null;
  generalPriceFrom?: number | null;
  generalPriceTo?: number | null;
  generalPriceToHard?: boolean;
}
