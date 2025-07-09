import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { IsEmail, IsEnum } from "class-validator";
import { and, eq } from "drizzle-orm";
import { sign } from "jsonwebtoken";
import { Field, InputType } from "type-graphql";

import { PostingRole } from "../constants";
import { PostingAccessTable, PostingTable } from "../db";

@InputType("InviteToPostingInput")
export class InviteToPostingInput {
  @Field()
  postingId: number;
  @Field()
  @IsEmail()
  email: string;
  @Field(() => PostingRole)
  @IsEnum(PostingRole)
  role: PostingRole;
}

export async function inviteToPosting(
  ctx: AuthorizedContext,
  input: InviteToPostingInput,
): Promise<boolean> {
  // Verify the posting exists and user has access to it
  const [posting] = await db
    .select()
    .from(PostingTable)
    .where(eq(PostingTable.id, input.postingId));

  if (!posting) {
    throw GQLError(404, "Posting not found");
  }

  // Check if user is the agency owner or has admin access
  if (posting.agency !== ctx.userId) {
    throw GQLError(403, "Unauthorized to invite users to this posting");
  }

  // Check if invitation already exists for this email and posting
  const [existingInvitation] = await db
    .select()
    .from(PostingAccessTable)
    .where(
      and(
        eq(PostingAccessTable.posting, input.postingId),
        eq(PostingAccessTable.email, input.email),
      ),
    );

  if (existingInvitation) {
    throw GQLError(400, "Invitation already exists for this email");
  }

  const [res] = await db
    .insert(PostingAccessTable)
    .values({
      posting: input.postingId,
      email: input.email,
      role: input.role,
    })
    .returning({ id: PostingAccessTable.id });

  if (!res?.id) {
    throw GQLError(500, "Error creating invite");
  }

  const token = sign(
    {
      id: res.id,
    },
    process.env.SIGNING_KEY!,
    { expiresIn: "7d" },
  );

  // TODO: Send token as email after frontend is ready

  return true;
}
