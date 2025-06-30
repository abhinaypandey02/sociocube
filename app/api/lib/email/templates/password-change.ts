import { EmailComponent, EmailComponentType } from "@backend/lib/email/types";

export const PasswordChange = ({
  name,
  link,
}: {
  name: string;
  link: string;
}) => ({
  subject: `Password Successfully Changed`,
  title: "Your Password Has Been Changed",
  components: [
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Hi ${name ? name : "there"},
Your password has been successfully changed.

If you did not initiate this change, please reset your password immediately.`,
    },
    {
      type: EmailComponentType.BUTTON,
      content: `Reset your password`,
      url: link,
      options: {
        align: "center",
      },
    },
  ] as EmailComponent[],
});
