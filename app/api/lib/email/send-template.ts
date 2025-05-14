import { getRenderedTemplate } from "@backend/lib/email/html";
import { getRenderedTemplateText } from "@backend/lib/email/text";
import { EmailComponent } from "@backend/lib/email/types";
import { waitUntil } from "@vercel/functions";

import { sendEmail } from "./driver";
import { ResetPassword } from "./templates/reset-password";
import { VerifyEmail } from "./templates/verify";
import { WelcomeUser } from "./templates/welcome";

export const Template = {
  WelcomeUser,
  VerifyEmail,
  ResetPassword,
};

export function sendTemplateEmail<T extends keyof typeof Template>(
  to: string,
  template: T,
  meta: Parameters<(typeof Template)[T]>[0],
) {
  const method: {
    subject: string;
    title?: string;
    components: EmailComponent[];
  } =
    // @ts-expect-error -- dynamic
    Template[template](meta);
  waitUntil(
    sendEmail(
      [to],
      method.subject,
      getRenderedTemplateText(
        method.title || method.subject,
        method.components,
      ),
      getRenderedTemplate(method.title || method.subject, method.components),
    ),
  );
}
