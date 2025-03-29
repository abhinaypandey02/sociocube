import { Field, ObjectType } from "type-graphql";

@ObjectType("StorageFile")
export class FileGQL {
  @Field()
  uploadURL: string;
  @Field()
  url: string;
}
