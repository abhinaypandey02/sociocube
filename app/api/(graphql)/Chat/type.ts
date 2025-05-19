import { Field, ObjectType } from "type-graphql";

@ObjectType("Conversation")
export class ConversationGQL {
  @Field()
  id: number;
}

@ObjectType("Message")
export class MessageGQL {
  @Field()
  body: string;
  @Field(() => Number)
  createdAt: Date;
  @Field()
  by: number;
  @Field()
  id: number;
}

@ObjectType("Preview")
export class PreviewGQL {
  @Field()
  text: string;
  @Field(() => Number)
  hasRead: boolean;
  @Field(() => Number)
  at: Date;
}
