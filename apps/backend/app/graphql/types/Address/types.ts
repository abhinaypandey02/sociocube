import { Field, InputType, ObjectType } from "type-graphql";
import { IsLatitude, IsLongitude } from "class-validator";

@ObjectType("Address")
export class AddressGQL {
  @Field()
  id: number;
  @Field({ nullable: true })
  country?: string;
  @Field({ nullable: true })
  state?: string;
  @Field({ nullable: true })
  city?: string;
  @Field()
  line: string;
  @Field({ nullable: true })
  line2?: string;
  @Field({ nullable: true })
  latitude?: number;
  @Field({ nullable: true })
  longitude?: number;
}

@InputType("CreateAddressGQLInput")
export class CreateAddressGQLInput {
  @Field({ nullable: true })
  country?: string;
  @Field({ nullable: true })
  state?: string;
  @Field({ nullable: true })
  city?: string;
  @Field()
  line: string;
  @Field({ nullable: true })
  line2?: string;
  @IsLatitude()
  @Field({ nullable: true })
  latitude?: number;
  @IsLongitude()
  @Field({ nullable: true })
  longitude?: number;
}

@InputType("UpdateAddressGQLInput")
export class UpdateAddressGQLInput {
  @Field({ nullable: true })
  country?: string;
  @Field({ nullable: true })
  state?: string;
  @Field({ nullable: true })
  city?: string;
  @Field({ nullable: true })
  line?: string;
  @Field({ nullable: true })
  line2?: string;
  @IsLatitude()
  @Field({ nullable: true })
  latitude?: number;
  @IsLongitude()
  @Field({ nullable: true })
  longitude?: number;
}
