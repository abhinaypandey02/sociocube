import { Field, ObjectType } from "type-graphql";

@ObjectType("Conversation")
export class ConversationGQL {
  @Field()
  id: number;
  @Field()
  hasRead: boolean;
}

@ObjectType("Message")
export class MessageGQL {
  @Field()
  body: string;
  @Field(() => Number)
  sentAt: Date;
  @Field()
  byAgency: boolean;
}
