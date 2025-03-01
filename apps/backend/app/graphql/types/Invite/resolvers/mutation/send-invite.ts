import { and, count, eq, gte, or } from "drizzle-orm";
import { sign } from "jsonwebtoken";
import { MAX_ADMINS_OF_AGENCY } from "commons/constraints";
import { db } from "../../../../../../lib/db";
import { InviteTable, InviteType } from "../../db/schema";
import GQLError from "../../../../constants/errors";
import { AuthorizedContext } from "../../../../context";
import { sendTemplateEmail } from "../../../../../../lib/email/template";
import { DAY } from "../../../../utils/time";
import { AgencyMember } from "../../../Agency/db/schema";
import { AgencyMemberType } from "../../../../constants/agency-member-type";
import { UserTable } from "../../../User/db/schema";

const INVITE_COOLDOWN = 7;
const MAX_INVITES_AT_ONCE = 7;
const MAX_EMAIL_ATTEMPTS = 7;

function getInviteLink(id: number, agency: number) {
  const token = sign({ id, agency }, process.env.SIGNING_KEY || "", {
    expiresIn: "7d",
  });
  return `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/invite/${token}`;
}

export async function sendInvite(
  ctx: AuthorizedContext,
  email: string,
  type: InviteType,
  agency: number,
) {
  const [hasPermission] = await db
    .select()
    .from(AgencyMember)
    .where(
      and(eq(AgencyMember.user, ctx.userId), eq(AgencyMember.agency, agency)),
    );
  if (!hasPermission)
    throw GQLError(403, "You dont have permission for this agency");
  const weekLater = new Date();
  weekLater.setDate(weekLater.getDate() + INVITE_COOLDOWN);
  await db
    .delete(InviteTable)
    .where(
      and(
        or(eq(InviteTable.email, email), eq(InviteTable.by, ctx.userId)),
        gte(InviteTable.createdAt, weekLater),
      ),
    );
  const [existingInviteToEmail] = await db
    .select()
    .from(InviteTable)
    .where(and(eq(InviteTable.email, email)));
  if (existingInviteToEmail) {
    if (
      existingInviteToEmail.attempts < MAX_EMAIL_ATTEMPTS &&
      existingInviteToEmail.by === ctx.userId &&
      new Date().getTime() - existingInviteToEmail.createdAt.getTime() >
        (INVITE_COOLDOWN * DAY) / 2
    ) {
      await sendTemplateEmail(email, "VerifyEmail", {
        firstName: "",
        link: getInviteLink(existingInviteToEmail.id, agency),
      });
      await db.update(InviteTable).set({
        attempts: existingInviteToEmail.attempts + 1,
      });
      return true;
    }
    throw GQLError(
      400,
      `This user has already been invited to an agency. Please wait ${INVITE_COOLDOWN} days before inviting again!`,
    );
  }

  const [existingInviteByUser] = await db
    .select({
      count: count(InviteTable.id),
    })
    .from(InviteTable)
    .where(and(eq(InviteTable.by, ctx.userId)));
  if (
    existingInviteByUser &&
    existingInviteByUser.count > MAX_INVITES_AT_ONCE
  ) {
    throw GQLError(
      400,
      `You can only invite ${MAX_INVITES_AT_ONCE} at a time. Please wait for the invites to expire.`,
    );
  }
  if (type === InviteType.AgencyOwner) {
    const [existingOwner] = await db
      .select()
      .from(AgencyMember)
      .where(eq(AgencyMember.type, AgencyMemberType.Owner))
      .innerJoin(
        UserTable,
        and(eq(UserTable.id, AgencyMember.user), eq(UserTable.email, email)),
      );
    if (existingOwner)
      throw GQLError(400, "User is already an owner of an agency.");
  }

  if (type === InviteType.AgencyAdmin) {
    const [existingAdmins] = await db
      .select({
        count: count(AgencyMember.id),
      })
      .from(AgencyMember)
      .where(
        and(
          eq(AgencyMember.type, AgencyMemberType.Admin),
          eq(AgencyMember.agency, agency),
        ),
      );
    if (existingAdmins && existingAdmins.count > MAX_ADMINS_OF_AGENCY)
      throw GQLError(
        400,
        `An agency can only have a maximum of ${MAX_ADMINS_OF_AGENCY} admins`,
      );
  }
  const [inserted] = await db
    .insert(InviteTable)
    .values({
      by: ctx.userId,
      type,
      email,
    })
    .returning();
  if (!inserted) return false;

  await sendTemplateEmail(email, "VerifyEmail", {
    firstName: "",
    link: getInviteLink(inserted.id, agency),
  });
  return true;
}
