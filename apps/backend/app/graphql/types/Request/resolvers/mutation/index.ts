import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import type { Context } from "../../../../context";
import { handleSendResetPasswordEmail } from "./send-reset-password-email";
import { handleSendVerificationEmail } from "./send-verification-email";
import { handleResetPassword } from "./reset-password";

@Resolver()
export class RequestMutationResolver {
  @Mutation(() => Boolean, { nullable: true })
  sendResetPasswordEmail(@Arg("email") email: string) {
    return handleSendResetPasswordEmail(email);
  }
  @Authorized()
  @Mutation(() => Boolean)
  sendVerificationEmail(@Ctx() ctx: Context) {
    if (!ctx.userId) return null;
    return handleSendVerificationEmail(ctx.userId);
  }
  @Mutation(() => Boolean)
  resetPassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
  ) {
    return handleResetPassword(token, newPassword);
  }
}
