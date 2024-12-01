import { sendEmail } from "./nodemailer";
import { WelcomeUser } from "./templates/welcome";
import { VerifyEmail } from "./templates/verify";
import { BASE_TEMPLATE } from "./templates/base";

export const Template = {
  WelcomeUser,
  VerifyEmail,
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
