import { Field, ObjectType } from "type-graphql";
import { AgencyMemberType } from "../../constants/agency-member-type";

@ObjectType("Agency")
export class AgencyGQL {
  @Field()
  id: number;
  @Field()
  photo: string;
  @Field()
  name: string;
}
@ObjectType("AgencyMember")
export class AgencyMemberGQL {
  @Field(() => AgencyMemberType)
  type: AgencyMemberType;
}

@ObjectType("AgencyOnboarding")
export class AgencyOnboardingGQL {
  @Field(() => String, { nullable: true })
  photo: string | null;
  @Field()
  name: string;
  @Field(() => String, { nullable: true })
  contactEmail: string | null;
  @Field(() => String, { nullable: true })
  contactPhone: string | null;
  @Field()
  about: string;
  @Field(() => String, { nullable: true })
  username: string | null;
}
