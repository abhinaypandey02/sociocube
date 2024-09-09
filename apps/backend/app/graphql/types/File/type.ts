import { Field, ObjectType } from "type-graphql";

@ObjectType("File")
export class FileGQL {
  @Field()
  uploadURL: string;
  @Field()
  url: string;
}
