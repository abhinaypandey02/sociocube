import { Field, ObjectType, GraphQLISODateTime, Int } from "type-graphql";

@ObjectType("Chat")
export class ChatGQL {
  @Field()
  hasRead: boolean;
  @Field()
  preview?: string;
  with: number;
  @Field(() => Int)
  conversation: number;
}

@ObjectType("Message")
export class MessageGQL {
  @Field()
  body: string;
  @Field(() => GraphQLISODateTime)
  sentAt: string;
  @Field(() => Int)
  sender: number;
}
