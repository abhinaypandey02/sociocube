import { Field, ObjectType } from "type-graphql";
import { AuthScopes } from "../../constants/scopes";
import { Roles } from "../../constants/roles";

@ObjectType("OnboardingData")
class OnboardingData {
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
  city?: number;
  @Field({ nullable: true })
  state?: number;
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
}
