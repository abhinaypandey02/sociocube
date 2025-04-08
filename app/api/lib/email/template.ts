import { sendEmail } from "./nodemailer";
import { AcceptInvite } from "./templates/accept-invite";
import { BASE_TEMPLATE } from "./templates/base";
import { ResetPassword } from "./templates/reset-password";
import { VerifyEmail } from "./templates/verify";
import { WelcomeUser } from "./templates/welcome";

export const Template = {
  WelcomeUser,
  VerifyEmail,
  ResetPassword,
  AcceptInvite,
};

export function sendTemplateEmail<T extends keyof typeof Template>(
  to: string,
  template: T,
  meta: Parameters<(typeof Template)[T]>[0],
) {
  const method: { subject: string; html?: string; text: string } =
    // @ts-expect-error -- dynamic
    Template[template](meta);
  return sendEmail(
    to,
    method.subject,
    method.text,
    BASE_TEMPLATE(method.html || method.text.replaceAll("\n", "<br/>")),
  );
}
