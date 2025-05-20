import { getRenderedTemplate } from "@backend/lib/email/html";
import { getRenderedTemplateText } from "@backend/lib/email/text";
import { EmailComponent } from "@backend/lib/email/types";

import { sendEmail } from "./driver";
import { ApplicationReceived } from "./templates/application-received";
import { ApplicationRejected } from "./templates/application-rejected";
import { ApplicationSelected } from "./templates/application-selected";
import { ApplicationShortlisted } from "./templates/application-shortlisted";
import { CampaignApproved } from "./templates/campaign-approved";
import { CampaignCreated } from "./templates/campaign-created";
import { CampaignRejected } from "./templates/campaign-rejected";
import { MessageReceived } from "./templates/message-received";
import { NewCampaigns } from "./templates/new-campaigns";
import { PostingAnnouncement } from "./templates/posting-announcement";
import { ResetPassword } from "./templates/reset-password";
import { ShortlistAccepted } from "./templates/shortlist-accepted";
import { ShortlistDenied } from "./templates/shortlist-denied";
import { VerifyEmail } from "./templates/verify";
import { WelcomeUser } from "./templates/welcome";

export const Template = {
  WelcomeUser,
  VerifyEmail,
  ResetPassword,
  CampaignApproved,
  CampaignCreated,
  CampaignRejected,
  MessageReceived,
  NewCampaigns,
  ApplicationReceived,
  ApplicationSelected,
  ApplicationRejected,
  ApplicationShortlisted,
  ShortlistAccepted,
  ShortlistDenied,
  PostingAnnouncement,
};

export function sendTemplateEmail<T extends keyof typeof Template>(
  to: string,
  template: T,
  meta: Parameters<(typeof Template)[T]>[0],
) {
  return sendEmail(
    getTemplate(template, [
      {
        to,
        meta,
      },
    ]),
  );
}

export function getTemplate<T extends keyof typeof Template>(
  template: T,
  data: {
    to: string;
    meta: Parameters<(typeof Template)[T]>[0];
  }[],
) {
  return data.map(({ to, meta }) => {
    const method: {
      subject: string;
      title?: string;
      components: EmailComponent[];
    } =
      // @ts-expect-error -- dynamic
      Template[template](meta);
    return {
      to,
      subject: method.subject,
      text: getRenderedTemplateText(
        method.title || method.subject,
        method.components,
      ),
      html: getRenderedTemplate(
        method.title || method.subject,
        method.components,
      ),
    };
  });
}

export function sendBatchTemplateEmail<T extends keyof typeof Template>(
  template: T,
  data: {
    to: string;
    meta: Parameters<(typeof Template)[T]>[0];
  }[],
) {
  return sendEmail(getTemplate(template, data));
}
