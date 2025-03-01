import { and, count, eq } from "drizzle-orm";
import { verify } from "jsonwebtoken";
import { MAX_ADMINS_OF_AGENCY } from "commons/constraints";
import { db } from "../../../../../../lib/db";
import { UserTable } from "../../../User/db/schema";
import { InviteTable, InviteType } from "../../db/schema";
import GQLError from "../../../../constants/errors";
import { AuthorizedContext } from "../../../../context";
import { AgencyMember } from "../../../Agency/db/schema";
import { AgencyMemberType } from "../../../../constants/agency-member-type";
import { transferOwnership } from "../../utils";

export async function acceptInvite(ctx: AuthorizedContext, token: string) {
  const data = verify(token, process.env.SIGNING_KEY || "") as {
    id: number;
    agency: number;
  } | null;
  if (!data?.id || !data.agency)
    throw GQLError(400, "Invalid token, please request again");
  const [res] = await db
    .select()
    .from(InviteTable)
    .where(and(eq(InviteTable.id, data.id)))
    .innerJoin(UserTable, eq(UserTable.email, InviteTable.email));
  if (!res) throw GQLError(400, "Request expired, please request again");
  if (res.user.id !== ctx.userId)
    throw GQLError(
      400,
      "Request is not for this email account. Please use the same email where you received the invite.",
    );
  if (res.invite.type === InviteType.AgencyAdmin) {
    const [existingAdmins] = await db
      .select({
        count: count(AgencyMember.id),
      })
      .from(AgencyMember)
      .where(
        and(
          eq(AgencyMember.type, AgencyMemberType.Admin),
          eq(AgencyMember.agency, data.agency),
        ),
      );
    if (existingAdmins && existingAdmins.count > MAX_ADMINS_OF_AGENCY)
      throw GQLError(
        400,
        `An agency can only have a maximum of ${MAX_ADMINS_OF_AGENCY} admins`,
      );
    await db.insert(AgencyMember).values({
      user: ctx.userId,
      type: AgencyMemberType.Owner,
      agency: data.agency,
    });
  }

  if (res.invite.type === InviteType.AgencyOwner) {
    await transferOwnership(ctx.userId, data.agency);
  }
  await db.delete(InviteTable).where(eq(InviteTable.id, data.id));
  return true;
}
